package com.cmp.model.dto.userInfo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 更新用户信息请求
 *
 * cmp
 *
 */
@Data
public class UserInfoUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 姓名
     */
    private String name;

    /**
     * 电话
     */
    private String phone;

    /**
     * 地址
     */
    private String address;

    private static final long serialVersionUID = 1L;
}