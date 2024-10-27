package com.cmp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.common.ErrorCode;
import com.cmp.constant.CommonConstant;
import com.cmp.exception.ThrowUtils;
import com.cmp.model.dto.carts.CartsQueryRequest;
import com.cmp.model.entity.Carts;
import com.cmp.model.entity.Goods;
import com.cmp.model.vo.CartsVO;
import com.cmp.model.vo.GoodsVO;
import com.cmp.service.CartsService;
import com.cmp.mapper.CartsMapper;
import com.cmp.service.GoodsService;
import com.cmp.utils.SqlUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author 蓝朽
* @description 针对表【carts(购物车)】的数据库操作Service实现
* @createDate 2024-10-23 08:34:33
*/
@Service
public class CartsServiceImpl extends ServiceImpl<CartsMapper, Carts>
    implements CartsService{
    @Resource
    private GoodsService goodsService;
    @Override
    public void validCarts(Carts carts, boolean add) {
        ThrowUtils.throwIf(carts == null, ErrorCode.PARAMS_ERROR);
        Long goodsId = carts.getGoodsId();
        Integer quantity = carts.getQuantity();
        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(ObjectUtil.isNull(goodsId), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(ObjectUtil.isNull(quantity) && quantity >= 1, ErrorCode.PARAMS_ERROR);
        }
    }

    @Override
    public QueryWrapper<Carts> getQueryWrapper(CartsQueryRequest cartsQueryRequest) {
        QueryWrapper<Carts> queryWrapper = new QueryWrapper<>();
        if (cartsQueryRequest == null) {
            return queryWrapper;
        }
        Long id = cartsQueryRequest.getId();
        String sortField = cartsQueryRequest.getSortField();
        String sortOrder = cartsQueryRequest.getSortOrder();
        // 精确查询
        queryWrapper.eq(ObjectUtil.isNotEmpty(id), "id", id);
        // 排序规则
        queryWrapper.orderBy(SqlUtils.validSortField(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public CartsVO getCartsVO(Carts carts, HttpServletRequest request) {
        // 对象转封装类
        CartsVO cartsVO = CartsVO.objToVo(carts);
        // 获取购物车商品
        Long goodsId = carts.getGoodsId();
        Goods goods = goodsService.getById(goodsId);
        GoodsVO goodsVO = GoodsVO.objToVo(goods);
        goodsVO.setQuantity(carts.getQuantity());
        cartsVO.setGoods(goodsVO);
        return cartsVO;
    }

    @Override
    public Page<CartsVO> getCartsVOPage(Page<Carts> cartsPage, HttpServletRequest request) {
        List<Carts> cartsList = cartsPage.getRecords();
        Page<CartsVO> cartsVOPage = new Page<>(cartsPage.getCurrent(), cartsPage.getSize(), cartsPage.getTotal());
        if (CollUtil.isEmpty(cartsList)) {
            return cartsVOPage;
        }
        // 对象列表 => 封装对象列表
        List<CartsVO> cartsVOList = cartsList
                .stream()
                .map(carts ->getCartsVO(carts, request))
                .collect(Collectors.toList());
        cartsVOPage.setRecords(cartsVOList);
        return cartsVOPage;
    }
}




