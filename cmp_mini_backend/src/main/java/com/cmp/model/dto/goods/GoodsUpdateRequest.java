package com.cmp.model.dto.goods;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 更新商品请求
 *
 * cmp
 *
 */
@Data
public class GoodsUpdateRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 商品名称
     */
    private String name;

    /**
     * 商品分类id
     */
    private Long categoryId;

    /**
     * 供应商id
     */
    private Long supplierId;

    /**
     * 商品价格
     */
    private BigDecimal price;

    /**
     * 商品库存
     */
    private Integer stock;

    /**
     * 商品描述
     */
    private String description;

    /**
     * 商品图片地址
     */
    private String image;

    private static final long serialVersionUID = 1L;
}