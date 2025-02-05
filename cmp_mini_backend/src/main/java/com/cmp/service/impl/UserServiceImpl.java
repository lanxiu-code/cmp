package com.cmp.service.impl;

import static com.cmp.constant.UserConstant.USER_LOGIN_STATE;

import cn.dev33.satoken.stp.SaLoginModel;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.common.ErrorCode;
import com.cmp.constant.CommonConstant;
import com.cmp.exception.BusinessException;
import com.cmp.mapper.UserMapper;
import com.cmp.model.dto.user.UserQueryRequest;
import com.cmp.model.entity.User;
import com.cmp.model.entity.UserInfo;
import com.cmp.model.enums.UserRoleEnum;
import com.cmp.model.vo.LoginUserVO;
import com.cmp.model.vo.UserVO;
import com.cmp.service.UserInfoService;
import com.cmp.service.UserService;
import com.cmp.utils.SqlUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

/**
 * 用户服务实现
 *
 * cmp
 * 
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Resource
    private UserInfoService userInfoService;
    /**
     * 盐值，混淆密码
     */
    public static final String SALT = "lanxiu";

    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword) {
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        if (userPassword.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        // 密码和校验密码相同
        if (!userPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入的密码不一致");
        }
        synchronized (userAccount.intern()) {
            // 账户不能重复
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("userAccount", userAccount);
            long count = this.baseMapper.selectCount(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
            }
            // 2. 加密
            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
            // 3. 插入数据
            User user = new User();
            user.setUserAccount(userAccount);
            user.setUserPassword(encryptPassword);
            boolean saveResult = this.save(user);
            if (!saveResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库错误");
            }
            return user.getId();
        }
    }

    @Override
    public String userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号错误");
        }
        if (userPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码错误");
        }
        // 2. 加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        // 查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        queryWrapper.eq("userPassword", encryptPassword);
        User user = this.baseMapper.selectOne(queryWrapper);
        // 用户不存在
        if (user == null) {
            log.info("user login failed, userAccount cannot match userPassword");
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在或密码错误");
        }
        // 3. 记录用户的登录态
        StpUtil.login(user.getId(),new SaLoginModel()
                .setDevice("MINI_APP")                // 此次登录的客户端设备类型, 用于[同端互斥登录]时指定此次登录的设备类型
                .setTimeout(60 * 60 * 24 * 7)    // 指定此次登录token的有效期, 单位:秒 （如未指定，自动取全局配置的 timeout 值）
                .setIsWriteHeader(false)         // 是否在登录后将 Token 写入到响应头
        );
        return StpUtil.getTokenInfo().getTokenValue();
    }
    /*
     * 获取uid
     * */
    @Override
    public Long getUid() {
        String tokenValue = StpUtil.getTokenValue();
        if (tokenValue == null ) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        String uid = (String) StpUtil.getLoginIdByToken(tokenValue);
        return Long.parseLong(uid);
    }


    public User getUser(){
        // 先判断是否已登录
        String tokenValue = StpUtil.getTokenValue();
        if (tokenValue == null ) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        Object loginId = StpUtil.getLoginIdByToken(tokenValue);
        if (loginId == null ) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        return this.getById(loginId.toString());
    }
    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @Override
    public User getLoginUser(HttpServletRequest request) {
        User currentUser = getUser();
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        return currentUser;
    }

    /**
     * 获取当前登录用户（允许未登录）
     *
     * @param request
     * @return
     */
    @Override
    public User getLoginUserPermitNull(HttpServletRequest request) {
        // 先判断是否已登录
        String tokenValue = StpUtil.getTokenValue();
        if (tokenValue == null ) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        Object loginId = StpUtil.getLoginIdByToken(tokenValue);
        if (loginId == null ) {
            return null;
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        return this.getById(loginId.toString());
    }

    /**
     * 是否为管理员
     *
     * @param request
     * @return
     */
    @Override
    public boolean isAdmin(HttpServletRequest request) {
        User user =  getUser();
        return isAdmin(user);
    }

    @Override
    public boolean isAdmin(User user) {
        return user != null && UserRoleEnum.ADMIN.getValue().equals(user.getUserRole());
    }

    /**
     * 用户注销
     *
     * @param request
     */
    @Override
    public boolean userLogout(HttpServletRequest request) {
        String tokenValue = StpUtil.getTokenValue();
        if (tokenValue == null ) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 移除登录态
        StpUtil.logoutByTokenValue(tokenValue);
        return true;
    }

    @Override
    public LoginUserVO getLoginUserVO(User user) {
        if (user == null) {
            return null;
        }
        Long uid = user.getId();
        UserInfo userInfo = userInfoService.getOne(Wrappers
                .lambdaQuery(UserInfo.class).eq(UserInfo::getUid, uid));
        LoginUserVO loginUserVO = new LoginUserVO();
        BeanUtils.copyProperties(user, loginUserVO);
        loginUserVO.setName(userInfo.getName());
        loginUserVO.setPhone(userInfo.getPhone());
        return loginUserVO;
    }

    @Override
    public UserVO getUserVO(User user) {
        if (user == null) {
            return null;
        }
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        return userVO;
    }

    @Override
    public List<UserVO> getUserVO(List<User> userList) {
        if (CollUtil.isEmpty(userList)) {
            return new ArrayList<>();
        }
        return userList.stream().map(this::getUserVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest) {
        if (userQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = userQueryRequest.getId();
        String unionId = userQueryRequest.getUnionId();
        String mpOpenId = userQueryRequest.getMpOpenId();
        String userName = userQueryRequest.getUserName();
        String userProfile = userQueryRequest.getUserProfile();
        String userRole = userQueryRequest.getUserRole();
        String sortField = userQueryRequest.getSortField();
        String sortOrder = userQueryRequest.getSortOrder();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.eq(StringUtils.isNotBlank(unionId), "unionId", unionId);
        queryWrapper.eq(StringUtils.isNotBlank(mpOpenId), "mpOpenId", mpOpenId);
        queryWrapper.eq(StringUtils.isNotBlank(userRole), "userRole", userRole);
        queryWrapper.like(StringUtils.isNotBlank(userProfile), "userProfile", userProfile);
        queryWrapper.like(StringUtils.isNotBlank(userName), "userName", userName);
        queryWrapper.orderBy(SqlUtils.validSortField(sortField), sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }
}
