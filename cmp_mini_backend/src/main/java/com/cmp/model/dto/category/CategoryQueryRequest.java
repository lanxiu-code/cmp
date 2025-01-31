package com.cmp.model.dto.category;

import com.cmp.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 查询商品分类请求
 *
 * cmp
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryQueryRequest extends PageRequest implements Serializable {


    /**
     * id
     */
    private Long id;


    private static final long serialVersionUID = 1L;
}