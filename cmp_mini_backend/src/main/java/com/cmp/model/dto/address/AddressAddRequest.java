package com.cmp.model.dto.address;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 创建地址请求
 *
 * cmp
 *
 */
@Data
public class AddressAddRequest implements Serializable {
    /**
     * id
     */
    private Long id;
    /**
     * 收货人姓名
     */
    private String name;

    /**
     * 收货人电话
     */
    private String phone;
    /**
     * 省份名称
     */
    private String provinceName;

    /**
     * 城市名称
     */
    private String countyName;

    /**
     * 县名称
     */
    private String cityName;

    /**
     * 乡镇名称
     */
    private String townName;

    /**
     * 详细地址
     */
    private String detail;

    /**
     * 是否默认地址(0-否，1-是)
     */
    private Integer isDefault;
    private static final long serialVersionUID = 1L;
}