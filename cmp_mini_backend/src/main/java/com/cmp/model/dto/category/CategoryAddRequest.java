package com.cmp.model.dto.category;

import lombok.Data;

import java.io.Serializable;


/**
 * 创建商品分类请求
 *
 * cmp
 *
 */
@Data
public class CategoryAddRequest implements Serializable {

    /**
     * 分类名称
     */
    private String name;


    private static final long serialVersionUID = 1L;
}