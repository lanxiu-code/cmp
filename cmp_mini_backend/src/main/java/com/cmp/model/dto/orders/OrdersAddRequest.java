package com.cmp.model.dto.orders;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.cmp.model.entity.Goods;
import com.cmp.model.vo.GoodsVO;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 创建订单请求
 *
 * cmp
 *
 */
@Data
public class OrdersAddRequest implements Serializable {

    /**
     * 商品id列表
     */
    private List<OrderGoodsAdd> orderGoodsAddList;
    /*
     * 地址id
     * */
    private Long addressId;
    /**
     * 商品数量
     */
    private Integer quantity;
    /*
     * 订单备注
     * */
    private String remark;
    /**
     * 订单总金额
     */
    private BigDecimal totalPrice;

    private static final long serialVersionUID = 1L;
}