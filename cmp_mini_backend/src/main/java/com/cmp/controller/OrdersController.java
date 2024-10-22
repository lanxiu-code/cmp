package com.cmp.controller;

import cn.hutool.core.util.IdUtil;
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
import com.cmp.model.dto.orders.OrdersAddRequest;
import com.cmp.model.dto.orders.OrderGoodsAdd;
import com.cmp.model.dto.orders.OrdersQueryRequest;
import com.cmp.model.dto.orders.OrdersUpdateRequest;
import com.cmp.model.entity.OrderGoods;
import com.cmp.model.entity.Orders;
import com.cmp.model.vo.OrdersVO;
import com.cmp.service.OrderGoodsService;
import com.cmp.service.OrdersService;
import com.cmp.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 订单接口
 *
 * cmp
 *
 */
@RestController
@RequestMapping("/orders")
@Slf4j
public class OrdersController {

    @Resource
    private OrdersService ordersService;
    @Resource
    private OrderGoodsService orderGoodsService;
    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建订单
     *
     * @param ordersAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @Transactional
    public BaseResponse<Long> addOrders(@RequestBody OrdersAddRequest ordersAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(ordersAddRequest == null, ErrorCode.PARAMS_ERROR);
        Orders orders = new Orders();
        BeanUtils.copyProperties(ordersAddRequest, orders);
        // 数据校验
        ordersService.validOrders(orders, true);
        List<OrderGoodsAdd> goodsAddList = ordersAddRequest.getOrderGoodsAddList();
        ThrowUtils.throwIf(goodsAddList == null || goodsAddList.isEmpty(), ErrorCode.PARAMS_ERROR);
        String orderNo = IdUtil.simpleUUID();
        Long uid = userService.getUid();
        orders.setUid(uid);
        orders.setOrderNo(orderNo);
        // 插入订单
        boolean result = ordersService.save(orders);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 返回新写入的数据 id
        long newOrdersId = orders.getId();
        // 插入订单商品
        List<OrderGoods> orderGoodsList = goodsAddList.stream().map(orderGoodsAdd -> {
            OrderGoods orderGoods = new OrderGoods();
            BeanUtils.copyProperties(orderGoodsAdd, orderGoods);
            orderGoods.setOrderId(newOrdersId);
            return orderGoods;
        }).collect(Collectors.toList());
        boolean orderGoodsRes = orderGoodsService.saveBatch(orderGoodsList);
        ThrowUtils.throwIf(!orderGoodsRes, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(newOrdersId);
    }

    /**
     * 删除订单
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @Transactional
    public BaseResponse<Boolean> deleteOrders(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long id = deleteRequest.getId();
        // 判断是否存在
        Orders oldOrders = ordersService.getById(id);
        ThrowUtils.throwIf(oldOrders == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = ordersService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 删除关联订单商品
        boolean orderGoodsRes = orderGoodsService.remove(new QueryWrapper<OrderGoods>().eq("orderId", id));
        ThrowUtils.throwIf(!orderGoodsRes, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 更新订单（仅管理员可用）
     *
     * @param ordersUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateOrders(@RequestBody OrdersUpdateRequest ordersUpdateRequest) {
        if (ordersUpdateRequest == null || ordersUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Orders orders = new Orders();
        BeanUtils.copyProperties(ordersUpdateRequest, orders);
        // 数据校验
        ordersService.validOrders(orders, false);
        // 判断是否存在
        long id = ordersUpdateRequest.getId();
        Orders oldOrders = ordersService.getById(id);
        ThrowUtils.throwIf(oldOrders == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = ordersService.updateById(orders);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取订单（封装类）
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    public BaseResponse<OrdersVO> getOrdersVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Orders orders = ordersService.getById(id);
        ThrowUtils.throwIf(orders == null, ErrorCode.NOT_FOUND_ERROR);
        // 获取封装类
        return ResultUtils.success(ordersService.getOrdersVO(orders, request));
    }

    /**
     * 分页获取订单列表（仅管理员可用）
     *
     * @param ordersQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Orders>> listOrdersByPage(@RequestBody OrdersQueryRequest ordersQueryRequest) {
        long current = ordersQueryRequest.getCurrent();
        long size = ordersQueryRequest.getPageSize();
        // 查询数据库
        Page<Orders> ordersPage = ordersService.page(new Page<>(current, size),
                ordersService.getQueryWrapper(ordersQueryRequest));
        return ResultUtils.success(ordersPage);
    }

    /**
     * 分页获取订单列表（封装类）
     *
     * @param ordersQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<OrdersVO>> listOrdersVOByPage(@RequestBody OrdersQueryRequest ordersQueryRequest,
                                                               HttpServletRequest request) {
        long size = ordersQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Orders> ordersPage = ordersService.page(new Page<>(ordersQueryRequest.getCurrent(), size),
                ordersService.getQueryWrapper(ordersQueryRequest));
        // 获取封装类
        return ResultUtils.success(ordersService.getOrdersVOPage(ordersPage, request));
    }

    /**
     * 分页获取当前登录用户创建的订单列表
     *
     * @param ordersQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    @AuthCheck(mustRole = UserConstant.DEFAULT_ROLE)
    public BaseResponse<Page<OrdersVO>> listMyOrdersVOByPage(@RequestBody OrdersQueryRequest ordersQueryRequest,
                                                                 HttpServletRequest request) {
        ThrowUtils.throwIf(ordersQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = ordersQueryRequest.getCurrent();
        long size = ordersQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Long uid = userService.getUid();
        ThrowUtils.throwIf(uid == null, ErrorCode.SYSTEM_ERROR);
        QueryWrapper<Orders> wrapper = ordersService.getQueryWrapper(ordersQueryRequest).eq("uid", uid);
        // 查询数据库
        Page<Orders> ordersPage = ordersService.page(new Page<>(current, size),wrapper);
        // 获取封装类
        return ResultUtils.success(ordersService.getOrdersVOPage(ordersPage, request));
    }

    // endregion
}
