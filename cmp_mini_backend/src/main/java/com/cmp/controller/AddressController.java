package com.cmp.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmp.annotation.AuthCheck;
import com.cmp.common.BaseResponse;
import com.cmp.common.DeleteRequest;
import com.cmp.common.ErrorCode;
import com.cmp.common.ResultUtils;
import com.cmp.constant.UserConstant;
import com.cmp.exception.BusinessException;
import com.cmp.exception.ThrowUtils;
import com.cmp.model.dto.address.AddressAddRequest;
import com.cmp.model.dto.address.AddressEditRequest;
import com.cmp.model.dto.address.AddressQueryRequest;
import com.cmp.model.dto.address.AddressUpdateRequest;
import com.cmp.model.entity.Address;
import com.cmp.model.entity.User;
import com.cmp.model.vo.AddressVO;
import com.cmp.service.AddressService;
import com.cmp.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.baomidou.mybatisplus.core.toolkit.Wrappers.lambdaQuery;

/**
 * 地址接口
 *
 * cmp
 *
 */
@RestController
@RequestMapping("/address")
@Slf4j
public class AddressController {

    @Resource
    private AddressService addressService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建地址
     *
     * @param addressAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.DEFAULT_ROLE)
    public BaseResponse<Long> addAddress(@RequestBody AddressAddRequest addressAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(addressAddRequest == null, ErrorCode.PARAMS_ERROR);
        Address address = new Address();
        BeanUtils.copyProperties(addressAddRequest, address);
        // 数据校验
        addressService.validAddress(address, true);
        Long uid = userService.getUid();
        address.setUid(uid);
        // 写入数据库
        boolean result = addressService.save(address);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 返回新写入的数据 id
        long newAddressId = address.getId();
        return ResultUtils.success(newAddressId);
    }

    /**
     * 删除地址
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.DEFAULT_ROLE)
    public BaseResponse<Boolean> deleteAddress(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long uid = userService.getUid();
        long id = deleteRequest.getId();
        // 判断是否存在
        Address oldAddress = addressService.getById(id);
        ThrowUtils.throwIf(oldAddress == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldAddress.getUid().equals(uid) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = addressService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 更新地址（仅管理员可用）
     *
     * @param addressUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateAddress(@RequestBody AddressUpdateRequest addressUpdateRequest) {
        if (addressUpdateRequest == null || addressUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Address address = new Address();
        BeanUtils.copyProperties(addressUpdateRequest, address);
        // 数据校验
        addressService.validAddress(address, false);
        // 判断是否存在
        long id = addressUpdateRequest.getId();
        Address oldAddress = addressService.getById(id);
        ThrowUtils.throwIf(oldAddress == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = addressService.updateById(address);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取地址（封装类）
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    @AuthCheck(mustRole = UserConstant.DEFAULT_ROLE)
    public BaseResponse<AddressVO> getAddressVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 只能查询本人地址
        Long uid = userService.getUid();
        LambdaQueryWrapper<Address> wrapper = lambdaQuery(Address.class)
                .eq(Address::getUid, uid)
                .eq(Address::getId, id);
        // 查询数据库
        Address address = addressService.getOne(wrapper);
        // 获取封装类
        return ResultUtils.success(addressService.getAddressVO(address, request));
    }

    /**
     * 分页获取地址列表（仅管理员可用）
     *
     * @param addressQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Address>> listAddressByPage(@RequestBody AddressQueryRequest addressQueryRequest) {
        long current = addressQueryRequest.getCurrent();
        long size = addressQueryRequest.getPageSize();
        // 查询数据库
        Page<Address> addressPage = addressService.page(new Page<>(current, size),
                addressService.getQueryWrapper(addressQueryRequest));
        return ResultUtils.success(addressPage);
    }

    /**
     * 分页获取地址列表（封装类）
     *
     * @param addressQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<AddressVO>> listAddressVOByPage(@RequestBody AddressQueryRequest addressQueryRequest,
                                                               HttpServletRequest request) {
        long current = addressQueryRequest.getCurrent();
        long size = addressQueryRequest.getPageSize();
        // 限制爬虫
        //ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Address> addressPage = addressService.page(new Page<>(current, size),
                addressService.getQueryWrapper(addressQueryRequest));
        // 获取封装类
        return ResultUtils.success(addressService.getAddressVOPage(addressPage, request));
    }

    /**
     * 分页获取当前登录用户创建的地址列表
     *
     * @param addressQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<AddressVO>> listMyAddressVOByPage(@RequestBody AddressQueryRequest addressQueryRequest,
                                                                 HttpServletRequest request) {
        ThrowUtils.throwIf(addressQueryRequest == null, ErrorCode.PARAMS_ERROR);
        // 补充查询条件，只查询当前登录用户的数据
        long current = addressQueryRequest.getCurrent();
        long size = addressQueryRequest.getPageSize();
        // 限制爬虫
        //ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 仅查询自己的地址
        QueryWrapper<Address> wrapper = addressService
                .getQueryWrapper(addressQueryRequest)
                .eq("uid", userService.getUid());
        // 查询数据库
        Page<Address> addressPage = addressService.page(new Page<>(current, size),wrapper);
        // 获取封装类
        return ResultUtils.success(addressService.getAddressVOPage(addressPage, request));
    }

    /**
     * 编辑地址（给用户使用）
     *
     * @param addressEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    @AuthCheck(mustRole = UserConstant.DEFAULT_ROLE)
    public BaseResponse<Boolean> editAddress(@RequestBody AddressEditRequest addressEditRequest, HttpServletRequest request) {
        if (addressEditRequest == null || addressEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Address address = new Address();
        BeanUtils.copyProperties(addressEditRequest, address);
        // 数据校验
        addressService.validAddress(address, false);
        // 判断是否存在
        long id = addressEditRequest.getId();
        Address oldAddress = addressService.getById(id);
        ThrowUtils.throwIf(oldAddress == null, ErrorCode.NOT_FOUND_ERROR);
        Long uid = userService.getUid();
        // 仅本人或管理员可编辑
        if (!oldAddress.getUid().equals(uid) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = addressService.updateById(address);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    // endregion
}
