package com.cmp.model.dto.category;

import lombok.Data;

import java.io.Serializable;

/**
 * 更新商品分类请求
 *
 * cmp
 *
 */
@Data
public class CategoryUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 分类名称
     */
    private String name;

    private static final long serialVersionUID = 1L;
}