package com.cmp.model.dto.userInfo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 创建用户信息请求
 *
 * cmp
 *
 */
@Data
public class UserInfoAddRequest implements Serializable {

    /**
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 标签列表
     */
    private List<String> tags;

    private static final long serialVersionUID = 1L;
}