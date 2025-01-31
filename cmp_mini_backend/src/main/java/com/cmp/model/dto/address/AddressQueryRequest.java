package com.cmp.model.dto.address;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.cmp.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * 查询地址请求
 *
 * cmp
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class AddressQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    private static final long serialVersionUID = 1L;
}