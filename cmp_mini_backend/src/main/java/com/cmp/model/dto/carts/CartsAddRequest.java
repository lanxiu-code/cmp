package com.cmp.model.dto.carts;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 创建购物车请求
 *
 * cmp
 *
 */
@Data
public class CartsAddRequest implements Serializable {

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