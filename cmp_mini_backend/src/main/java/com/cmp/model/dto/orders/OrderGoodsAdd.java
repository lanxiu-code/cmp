package com.cmp.model.dto.orders;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderGoodsAdd {
    /**
     * 商品id
     */
    private Long goodsId;

    /*
    * 数量
    * */
    private Integer quantity;
    /**
     * 商品价格
     */
    private BigDecimal price;
}
