package com.cmp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.common.ErrorCode;
import com.cmp.constant.CommonConstant;
import com.cmp.exception.ThrowUtils;
import com.cmp.model.dto.address.AddressQueryRequest;
import com.cmp.model.entity.Address;
import com.cmp.model.entity.User;
import com.cmp.model.entity.UserInfo;
import com.cmp.model.vo.AddressVO;
import com.cmp.service.AddressService;
import com.cmp.mapper.AddressMapper;
import com.cmp.service.UserInfoService;
import com.cmp.service.UserService;
import com.cmp.utils.SqlUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

/**
* @author 蓝朽
* @description 针对表【address(地址)】的数据库操作Service实现
* @createDate 2024-10-22 14:15:46
*/
@Service
public class AddressServiceImpl extends ServiceImpl<AddressMapper, Address>
    implements AddressService{
    @Resource
    private UserService userService;
    @Resource
    private UserInfoService userInfoService;
    @Override
    public void validAddress(Address address, boolean add) {
        ThrowUtils.throwIf(address == null, ErrorCode.PARAMS_ERROR);
        String provinceName = address.getProvinceName();
        String countyName = address.getCountyName();
        String cityName = address.getCityName();
        String townName = address.getTownName();
        String detail = address.getDetail();
        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isBlank(provinceName), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(StringUtils.isBlank(countyName), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(StringUtils.isBlank(cityName), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(StringUtils.isBlank(townName), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(StringUtils.isBlank(detail), ErrorCode.PARAMS_ERROR);
        }
    }

    @Override
    public QueryWrapper<Address> getQueryWrapper(AddressQueryRequest addressQueryRequest) {
        QueryWrapper<Address> queryWrapper = new QueryWrapper<>();
        if (addressQueryRequest == null) {
            return queryWrapper;
        }
        Long id = addressQueryRequest.getId();
        String sortField = addressQueryRequest.getSortField();
        String sortOrder = addressQueryRequest.getSortOrder();
        queryWrapper.eq(ObjectUtil.isNotEmpty(id), "id", id);
        // 排序规则
        queryWrapper.orderBy(SqlUtils.validSortField(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public AddressVO getAddressVO(Address address, HttpServletRequest request) {
        // 对象转封装类
        AddressVO addressVO = AddressVO.objToVo(address);
        // 获取用户信息
        Long uid = address.getUid();
        UserInfo userInfo = userInfoService.getOne(Wrappers.lambdaQuery(UserInfo.class)
                .eq(UserInfo::getUid, uid));
        addressVO.setName(userInfo.getName());
        addressVO.setPhone(userInfo.getPhone());
        return addressVO;
    }

    @Override
    public Page<AddressVO> getAddressVOPage(Page<Address> addressPage, HttpServletRequest request) {
        List<Address> addressList = addressPage.getRecords();
        Page<AddressVO> addressVOPage = new Page<>(addressPage.getCurrent(), addressPage.getSize(), addressPage.getTotal());
        if (CollUtil.isEmpty(addressList)) {
            return addressVOPage;
        }
        // 对象列表 => 封装对象列表
        List<AddressVO> addressVOList = addressList.stream()
                .map(address -> getAddressVO(address, request))
                .collect(Collectors.toList());
        addressVOPage.setRecords(addressVOList);
        return addressVOPage;
    }
}




