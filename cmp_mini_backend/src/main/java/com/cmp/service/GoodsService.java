package com.cmp.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cmp.model.dto.goods.GoodsQueryRequest;
import com.cmp.model.entity.Goods;
import com.cmp.model.vo.GoodsVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 蓝朽
* @description 针对表【goods(商品)】的数据库操作Service
* @createDate 2024-10-21 15:50:36
*/
public interface GoodsService extends IService<Goods> {

    /**
     * 校验数据
     *
     * @param goods
     * @param add 对创建的数据进行校验
     */
    void validGoods(Goods goods, boolean add);

    /**
     * 获取查询条件
     *
     * @param goodsQueryRequest
     * @return
     */
    QueryWrapper<Goods> getQueryWrapper(GoodsQueryRequest goodsQueryRequest);

    /**
     * 获取商品封装
     *
     * @param goods
     * @param request
     * @return
     */
    GoodsVO getGoodsVO(Goods goods, HttpServletRequest request);

    /**
     * 分页获取商品封装
     *
     * @param goodsPage
     * @param request
     * @return
     */
    Page<GoodsVO> getGoodsVOPage(Page<Goods> goodsPage, HttpServletRequest request);
}
