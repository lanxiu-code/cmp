package com.cmp.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmp.annotation.AuthCheck;
import com.cmp.common.BaseResponse;
import com.cmp.common.DeleteRequest;
import com.cmp.common.ErrorCode;
import com.cmp.common.ResultUtils;
import com.cmp.constant.UserConstant;
import com.cmp.exception.BusinessException;
import com.cmp.exception.ThrowUtils;
import com.cmp.model.dto.carts.CartsAddRequest;
import com.cmp.model.dto.carts.CartsEditRequest;
import com.cmp.model.dto.carts.CartsQueryRequest;
import com.cmp.model.dto.carts.CartsUpdateRequest;
import com.cmp.model.entity.Carts;
import com.cmp.model.entity.User;
import com.cmp.model.vo.CartsVO;
import com.cmp.service.CartsService;
import com.cmp.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 购物车接口
 *
 * cmp
 *
 */
@RestController
@RequestMapping("/carts")
@Slf4j
public class CartsController {

    @Resource
    private CartsService cartsService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建购物车
     *
     * @param cartsAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.DEFAULT_ROLE)
    public BaseResponse<Long> addCarts(@RequestBody CartsAddRequest cartsAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(cartsAddRequest == null, ErrorCode.PARAMS_ERROR);
        Carts carts = new Carts();
        BeanUtils.copyProperties(cartsAddRequest, carts);
        // 数据校验
        cartsService.validCarts(carts, true);
        Long uid = userService.getUid();
        carts.setUid(uid);
        // 写入数据库
        boolean result = cartsService.save(carts);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 返回新写入的数据 id
        long newCartsId = carts.getId();
        return ResultUtils.success(newCartsId);
    }

    /**
     * 删除购物车
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteCarts(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long uid = userService.getUid();
        long id = deleteRequest.getId();
        // 判断是否存在
        Carts oldCarts = cartsService.getById(id);
        ThrowUtils.throwIf(oldCarts == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldCarts.getUid().equals(uid) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = cartsService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 更新购物车（仅管理员可用）
     *
     * @param cartsUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateCarts(@RequestBody CartsUpdateRequest cartsUpdateRequest) {
        if (cartsUpdateRequest == null || cartsUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Carts carts = new Carts();
        BeanUtils.copyProperties(cartsUpdateRequest, carts);
        // 数据校验
        cartsService.validCarts(carts, false);
        // 判断是否存在
        long id = cartsUpdateRequest.getId();
        Carts oldCarts = cartsService.getById(id);
        ThrowUtils.throwIf(oldCarts == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = cartsService.updateById(carts);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取购物车（封装类）
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<CartsVO> getCartsVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Carts carts = cartsService.getById(id);
        ThrowUtils.throwIf(carts == null, ErrorCode.NOT_FOUND_ERROR);
        // 获取封装类
        return ResultUtils.success(cartsService.getCartsVO(carts, request));
    }

    /**
     * 分页获取购物车列表（仅管理员可用）
     *
     * @param cartsQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Carts>> listCartsByPage(@RequestBody CartsQueryRequest cartsQueryRequest) {
        long current = cartsQueryRequest.getCurrent();
        long size = cartsQueryRequest.getPageSize();
        // 查询数据库
        Page<Carts> cartsPage = cartsService.page(new Page<>(current, size),
                cartsService.getQueryWrapper(cartsQueryRequest));
        return ResultUtils.success(cartsPage);
    }

    /**
     * 分页获取购物车列表（封装类）
     *
     * @param cartsQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<CartsVO>> listCartsVOByPage(@RequestBody CartsQueryRequest cartsQueryRequest,
                                                               HttpServletRequest request) {
        long current = cartsQueryRequest.getCurrent();
        long size = cartsQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Carts> cartsPage = cartsService.page(new Page<>(current, size),
                cartsService.getQueryWrapper(cartsQueryRequest));
        // 获取封装类
        return ResultUtils.success(cartsService.getCartsVOPage(cartsPage, request));
    }

    /**
     * 分页获取当前登录用户创建的购物车列表
     *
     * @param cartsQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<CartsVO>> listMyCartsVOByPage(@RequestBody CartsQueryRequest cartsQueryRequest,
                                                                 HttpServletRequest request) {
        ThrowUtils.throwIf(cartsQueryRequest == null, ErrorCode.PARAMS_ERROR);

        long current = cartsQueryRequest.getCurrent();
        long size = cartsQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 补充查询条件，只查询当前登录用户的数据
        Long uid = userService.getUid();
        QueryWrapper<Carts> wrapper = cartsService
                .getQueryWrapper(cartsQueryRequest)
                .eq("uid", uid);
        // 查询数据库
        Page<Carts> cartsPage = cartsService.page(new Page<>(current, size),wrapper);
        // 获取封装类
        return ResultUtils.success(cartsService.getCartsVOPage(cartsPage, request));
    }

    /**
     * 编辑购物车（给用户使用）
     *
     * @param cartsEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    public BaseResponse<Boolean> editCarts(@RequestBody CartsEditRequest cartsEditRequest, HttpServletRequest request) {
        if (cartsEditRequest == null || cartsEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Carts carts = new Carts();
        BeanUtils.copyProperties(cartsEditRequest, carts);
        // 数据校验
        cartsService.validCarts(carts, false);
        Long uid = userService.getUid();
        // 判断是否存在
        long id = cartsEditRequest.getId();
        Carts oldCarts = cartsService.getById(id);
        ThrowUtils.throwIf(oldCarts == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可编辑
        if (!oldCarts.getUid().equals(uid) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = cartsService.updateById(carts);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    // endregion
}
