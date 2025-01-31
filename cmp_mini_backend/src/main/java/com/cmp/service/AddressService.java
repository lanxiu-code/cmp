package com.cmp.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmp.model.dto.address.AddressQueryRequest;
import com.cmp.model.entity.Address;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cmp.model.vo.AddressVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 蓝朽
* @description 针对表【address(地址)】的数据库操作Service
* @createDate 2024-10-22 14:15:46
*/
public interface AddressService extends IService<Address> {
    /**
     * 校验数据
     *
     * @param address
     * @param add 对创建的数据进行校验
     */
    void validAddress(Address address, boolean add);

    /**
     * 获取查询条件
     *
     * @param addressQueryRequest
     * @return
     */
    QueryWrapper<Address> getQueryWrapper(AddressQueryRequest addressQueryRequest);

    /**
     * 获取地址封装
     *
     * @param address
     * @param request
     * @return
     */
    AddressVO getAddressVO(Address address, HttpServletRequest request);

    /**
     * 分页获取地址封装
     *
     * @param addressPage
     * @param request
     * @return
     */
    Page<AddressVO> getAddressVOPage(Page<Address> addressPage, HttpServletRequest request);
}
