package com.cmp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.common.ErrorCode;
import com.cmp.constant.CommonConstant;
import com.cmp.exception.ThrowUtils;
import com.cmp.mapper.GoodsMapper;
import com.cmp.model.dto.goods.GoodsQueryRequest;
import com.cmp.model.entity.Goods;
import com.cmp.model.vo.GoodsVO;
import com.cmp.service.GoodsService;
import com.cmp.utils.SqlUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author 蓝朽
* @description 针对表【goods(商品)】的数据库操作Service实现
* @createDate 2024-10-21 15:50:36
*/
@Service
public class GoodsServiceImpl extends ServiceImpl<GoodsMapper, Goods>
    implements GoodsService {
    @Resource
    private GoodsMapper goodsMapper;
    @Override
    public void validGoods(Goods goods, boolean add) {
        ThrowUtils.throwIf(goods == null, ErrorCode.PARAMS_ERROR);
        Long id = goods.getId();
        String name = goods.getName();
        Long categoryId = goods.getCategoryId();
        BigDecimal price = goods.getPrice();
        Integer stock = goods.getStock();
        String image = goods.getImage();
        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isBlank(name), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(ObjectUtil.isNull(categoryId), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(ObjectUtil.isNull(price), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(ObjectUtil.isNull(stock), ErrorCode.PARAMS_ERROR);
            ThrowUtils.throwIf(ObjectUtil.isNull(image), ErrorCode.PARAMS_ERROR);
        }
        // 修改数据时，有参数则校验
        if (StringUtils.isNotBlank(name)) {
            ThrowUtils.throwIf(name.length() > 80, ErrorCode.PARAMS_ERROR, "标题过长");
        }
    }

    @Override
    public QueryWrapper<Goods> getQueryWrapper(GoodsQueryRequest goodsQueryRequest) {
        QueryWrapper<Goods> queryWrapper = new QueryWrapper<>();
        if (goodsQueryRequest == null) {
            return queryWrapper;
        }
        Long id = goodsQueryRequest.getId();
        String name = goodsQueryRequest.getName();
        Long categoryId = goodsQueryRequest.getCategoryId();
        String sortField = goodsQueryRequest.getSortField();
        String sortOrder = goodsQueryRequest.getSortOrder();
        // 模糊查询
        queryWrapper.like(StringUtils.isNotBlank(name), "name", name);
        // 精确查询
        queryWrapper.eq(ObjectUtil.isNotEmpty(id), "id", id);
        queryWrapper.eq(ObjectUtil.isNotEmpty(categoryId), "categoryId", categoryId);
        // 排序规则
        queryWrapper.orderBy(SqlUtils.validSortField(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public GoodsVO getGoodsVO(Goods goods, HttpServletRequest request) {
        // 对象转封装类
        return GoodsVO.objToVo(goods);
    }

    @Override
    public Page<GoodsVO> getGoodsVOPage(Page<Goods> goodsPage, HttpServletRequest request) {
        List<Goods> goodsList = goodsPage.getRecords();
        Page<GoodsVO> goodsVOPage = new Page<>(goodsPage.getCurrent(), goodsPage.getSize(), goodsPage.getTotal());
        if (CollUtil.isEmpty(goodsList)) {
            return goodsVOPage;
        }
        // 对象列表 => 封装对象列表
        List<GoodsVO> goodsVOList = goodsList.stream().map(GoodsVO::objToVo).collect(Collectors.toList());
        goodsVOPage.setRecords(goodsVOList);
        return goodsVOPage;
    }
}




