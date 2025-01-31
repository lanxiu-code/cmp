package com.cmp.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmp.model.dto.carts.CartsQueryRequest;
import com.cmp.model.entity.Carts;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cmp.model.vo.CartsVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 蓝朽
* @description 针对表【carts(购物车)】的数据库操作Service
* @createDate 2024-10-23 08:34:33
*/
public interface CartsService extends IService<Carts> {
    /**
     * 校验数据
     *
     * @param carts
     * @param add 对创建的数据进行校验
     */
    void validCarts(Carts carts, boolean add);

    /**
     * 获取查询条件
     *
     * @param cartsQueryRequest
     * @return
     */
    QueryWrapper<Carts> getQueryWrapper(CartsQueryRequest cartsQueryRequest);

    /**
     * 获取购物车封装
     *
     * @param carts
     * @param request
     * @return
     */
    CartsVO getCartsVO(Carts carts, HttpServletRequest request);

    /**
     * 分页获取购物车封装
     *
     * @param cartsPage
     * @param request
     * @return
     */
    Page<CartsVO> getCartsVOPage(Page<Carts> cartsPage, HttpServletRequest request);
}
