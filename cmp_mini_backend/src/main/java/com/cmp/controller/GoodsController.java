package com.cmp.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmp.annotation.AuthCheck;
import com.cmp.common.BaseResponse;
import com.cmp.common.DeleteRequest;
import com.cmp.common.ErrorCode;
import com.cmp.common.ResultUtils;
import com.cmp.constant.UserConstant;
import com.cmp.exception.BusinessException;
import com.cmp.exception.ThrowUtils;
import com.cmp.model.dto.goods.GoodsAddRequest;
import com.cmp.model.dto.goods.GoodsEditRequest;
import com.cmp.model.dto.goods.GoodsQueryRequest;
import com.cmp.model.dto.goods.GoodsUpdateRequest;
import com.cmp.model.entity.Goods;
import com.cmp.model.entity.User;
import com.cmp.model.vo.GoodsVO;
import com.cmp.service.GoodsService;
import com.cmp.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 商品接口
 *
 * cmp
 *
 */
@RestController
@RequestMapping("/goods")
@Slf4j
public class GoodsController {

    @Resource
    private GoodsService goodsService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建商品
     *
     * @param goodsAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Long> addGoods(@RequestBody GoodsAddRequest goodsAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(goodsAddRequest == null, ErrorCode.PARAMS_ERROR);
        Goods goods = new Goods();
        BeanUtils.copyProperties(goodsAddRequest, goods);
        // 数据校验
        goodsService.validGoods(goods, true);
        // 写入数据库
        boolean result = goodsService.save(goods);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 返回新写入的数据 id
        long newGoodsId = goods.getId();
        return ResultUtils.success(newGoodsId);
    }

    /**
     * 删除商品
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteGoods(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long id = deleteRequest.getId();
        // 判断是否存在
        Goods oldGoods = goodsService.getById(id);
        ThrowUtils.throwIf(oldGoods == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = goodsService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 更新商品（仅管理员可用）
     *
     * @param goodsUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateGoods(@RequestBody GoodsUpdateRequest goodsUpdateRequest) {
        if (goodsUpdateRequest == null || goodsUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Goods goods = new Goods();
        BeanUtils.copyProperties(goodsUpdateRequest, goods);
        // 数据校验
        goodsService.validGoods(goods, false);
        // 判断是否存在
        long id = goodsUpdateRequest.getId();
        Goods oldGoods = goodsService.getById(id);
        ThrowUtils.throwIf(oldGoods == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = goodsService.updateById(goods);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取商品（封装类）
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<GoodsVO> getGoodsVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Goods goods = goodsService.getById(id);
        ThrowUtils.throwIf(goods == null, ErrorCode.NOT_FOUND_ERROR);
        // 获取封装类
        return ResultUtils.success(goodsService.getGoodsVO(goods, request));
    }

    /**
     * 分页获取商品列表（仅管理员可用）
     *
     * @param goodsQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Goods>> listGoodsByPage(@RequestBody GoodsQueryRequest goodsQueryRequest) {
        long current = goodsQueryRequest.getCurrent();
        long size = goodsQueryRequest.getPageSize();
        // 查询数据库
        Page<Goods> goodsPage = goodsService.page(new Page<>(current, size),
                goodsService.getQueryWrapper(goodsQueryRequest));
        return ResultUtils.success(goodsPage);
    }

    /**
     * 分页获取商品列表（封装类）
     *
     * @param goodsQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<GoodsVO>> listGoodsVOByPage(@RequestBody GoodsQueryRequest goodsQueryRequest,
                                                               HttpServletRequest request) {
        long current = goodsQueryRequest.getCurrent();
        long size = goodsQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Goods> goodsPage = goodsService.page(new Page<>(current, size),
                goodsService.getQueryWrapper(goodsQueryRequest));
        // 获取封装类
        return ResultUtils.success(goodsService.getGoodsVOPage(goodsPage, request));
    }

    // endregion
}
