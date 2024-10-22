package com.cmp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.mapper.OrderGoodsMapper;
import com.cmp.model.entity.OrderGoods;
import com.cmp.service.OrderGoodsService;
import org.springframework.stereotype.Service;

@Service
public class OrderGoodsServiceImpl extends ServiceImpl<OrderGoodsMapper, OrderGoods>
        implements OrderGoodsService {
}
