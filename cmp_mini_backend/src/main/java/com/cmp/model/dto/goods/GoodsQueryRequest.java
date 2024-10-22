package com.cmp.model.dto.goods;

import com.cmp.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 查询商品请求
 *
 * cmp
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GoodsQueryRequest extends PageRequest implements Serializable {
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


    private static final long serialVersionUID = 1L;
}