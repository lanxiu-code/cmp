package com.cmp.model.dto.carts;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 更新购物车请求
 *
 * cmp
 *
 */
@Data
public class CartsUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 商品id
     */
    private Long goodsId;

    /**
     * 商品数量
     */
    private Integer quantity;

    private static final long serialVersionUID = 1L;
}