package com.cmp.model.dto.carts;

import com.cmp.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * 查询购物车请求
 *
 * cmp
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CartsQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    private static final long serialVersionUID = 1L;
}