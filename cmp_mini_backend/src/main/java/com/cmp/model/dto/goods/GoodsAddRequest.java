package com.cmp.model.dto.goods;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 创建商品请求
 *
 * cmp
 *
 */
@Data
public class GoodsAddRequest implements Serializable {


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