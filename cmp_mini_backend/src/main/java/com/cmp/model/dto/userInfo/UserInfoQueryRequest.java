package com.cmp.model.dto.userInfo;

import com.cmp.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * 查询用户信息请求
 *
 * cmp
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class UserInfoQueryRequest extends PageRequest implements Serializable {
    /**
     * id
     */
    private Long id;


    private static final long serialVersionUID = 1L;
}