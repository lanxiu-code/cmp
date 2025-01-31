package com.cmp.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmp.model.dto.orders.OrdersQueryRequest;
import com.cmp.model.entity.Orders;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cmp.model.vo.OrdersVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 蓝朽
* @description 针对表【orders(订单)】的数据库操作Service
* @createDate 2024-10-22 10:25:17
*/
public interface OrdersService extends IService<Orders> {
    /**
     * 校验数据
     *
     * @param orders
     * @param add 对创建的数据进行校验
     */
    void validOrders(Orders orders, boolean add);

    /**
     * 获取查询条件
     *
     * @param ordersQueryRequest
     * @return
     */
    QueryWrapper<Orders> getQueryWrapper(OrdersQueryRequest ordersQueryRequest);

    /**
     * 获取订单封装
     *
     * @param orders
     * @param request
     * @return
     */
    OrdersVO getOrdersVO(Orders orders, HttpServletRequest request);

    /**
     * 分页获取订单封装
     *
     * @param ordersPage
     * @param request
     * @return
     */
    Page<OrdersVO> getOrdersVOPage(Page<Orders> ordersPage, HttpServletRequest request);
}
