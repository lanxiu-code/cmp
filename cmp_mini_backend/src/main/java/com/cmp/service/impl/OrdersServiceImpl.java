package com.cmp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.LambdaUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.common.ErrorCode;
import com.cmp.constant.CommonConstant;
import com.cmp.exception.ThrowUtils;
import com.cmp.mapper.GoodsMapper;
import com.cmp.model.dto.orders.OrdersQueryRequest;
import com.cmp.model.entity.Address;
import com.cmp.model.entity.Goods;
import com.cmp.model.entity.OrderGoods;
import com.cmp.model.entity.Orders;
import com.cmp.model.vo.AddressVO;
import com.cmp.model.vo.GoodsVO;
import com.cmp.model.vo.OrdersVO;
import com.cmp.service.AddressService;
import com.cmp.service.GoodsService;
import com.cmp.service.OrderGoodsService;
import com.cmp.service.OrdersService;
import com.cmp.mapper.OrdersMapper;
import com.cmp.utils.SqlUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author 蓝朽
* @description 针对表【orders(订单)】的数据库操作Service实现
* @createDate 2024-10-22 10:25:17
*/
@Service
public class OrdersServiceImpl extends ServiceImpl<OrdersMapper, Orders>
    implements OrdersService{
    @Resource
    private OrdersMapper ordersMapper;
    @Resource
    private GoodsService goodsService;
    @Resource
    private AddressService addressService;
    @Resource
    private OrderGoodsService orderGoodsService;
    @Override
    public void validOrders(Orders orders, boolean add) {
        ThrowUtils.throwIf(orders == null, ErrorCode.PARAMS_ERROR);
        Integer quantity = orders.getQuantity();
        Long addressId = orders.getAddressId();
        BigDecimal totalPrice = orders.getTotalPrice();
        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(ObjectUtil.isNull(quantity), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(ObjectUtil.isNull(totalPrice), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(ObjectUtil.isNull(addressId), ErrorCode.PARAMS_ERROR);
        }

    }

    @Override
    public QueryWrapper<Orders> getQueryWrapper(OrdersQueryRequest ordersQueryRequest) {
        QueryWrapper<Orders> queryWrapper = new QueryWrapper<>();
        if (ordersQueryRequest == null) {
            return queryWrapper;
        }
        Long id = ordersQueryRequest.getId();
        Integer status = ordersQueryRequest.getStatus();
        String sortField = ordersQueryRequest.getSortField();
        String sortOrder = ordersQueryRequest.getSortOrder();
        // 精确查询
        queryWrapper.eq(ObjectUtil.isNotEmpty(id), "id", id);
        queryWrapper.eq(ObjectUtil.isNotEmpty(status), "status", status);
        // 排序规则
        queryWrapper.orderBy(SqlUtils.validSortField(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public OrdersVO getOrdersVO(Orders orders, HttpServletRequest request) {
        // 对象转封装类
        OrdersVO ordersVO = OrdersVO.objToVo(orders);
        Long id = ordersVO.getId();
        // 查询订单商品
        List<GoodsVO> goodsVOS = orderGoodsService.list(Wrappers
                .lambdaQuery(OrderGoods.class)
                .eq(OrderGoods::getOrderId, id)
        ).stream().map(orderGoods -> {
            Long goodsId = orderGoods.getGoodsId();
            // 查询商品表
            Goods goods = goodsService.getById(goodsId);
            GoodsVO goodsVO = GoodsVO.objToVo(goods);
            goodsVO.setQuantity(orderGoods.getQuantity());
            return goodsVO;
        }).collect(Collectors.toList());
        ordersVO.setGoodsList(goodsVOS);
        Address address = addressService.getById(orders.getAddressId());
        ordersVO.setAddress(AddressVO.objToVo(address));
        return ordersVO;
    }

    @Override
    public Page<OrdersVO> getOrdersVOPage(Page<Orders> ordersPage, HttpServletRequest request) {
        List<Orders> ordersList = ordersPage.getRecords();
        Page<OrdersVO> ordersVOPage = new Page<>(ordersPage.getCurrent(), ordersPage.getSize(), ordersPage.getTotal());
        if (CollUtil.isEmpty(ordersList)) {
            return ordersVOPage;
        }
        // 对象列表 => 封装对象列表
        List<OrdersVO> ordersVOList = ordersList.stream()
                .map(orders ->getOrdersVO(orders, request))
                .collect(Collectors.toList());
        ordersVOPage.setRecords(ordersVOList);
        return ordersVOPage;
    }
}




