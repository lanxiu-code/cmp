package com.cmp.model.vo;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.cmp.model.entity.Address;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 地址视图
 *
 * cmp
 *
 */
@Data
public class AddressVO implements Serializable {
    /**
     * id
     */
    private Long id;

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

    /**
     * 封装类转对象
     *
     * @param addressVO
     * @return
     */
    public static Address voToObj(AddressVO addressVO) {
        if (addressVO == null) {
            return null;
        }
        Address address = new Address();
        BeanUtils.copyProperties(addressVO, address);
        return address;
    }

    /**
     * 对象转封装类
     *
     * @param address
     * @return
     */
    public static AddressVO objToVo(Address address) {
        if (address == null) {
            return null;
        }
        AddressVO addressVO = new AddressVO();
        BeanUtils.copyProperties(address, addressVO);
        return addressVO;
    }
}
