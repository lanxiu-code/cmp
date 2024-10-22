package com.cmp.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cmp.model.dto.category.CategoryQueryRequest;
import com.cmp.model.entity.Category;
import com.cmp.model.vo.CategoryVO;

import javax.servlet.http.HttpServletRequest;

/**
* @author 蓝朽
* @description 针对表【category(商品分类)】的数据库操作Service
* @createDate 2024-10-21 15:50:24
*/
public interface CategoryService extends IService<Category> {
    /**
     * 校验数据
     *
     * @param category
     * @param add 对创建的数据进行校验
     */
    void validCategory(Category category, boolean add);

    /**
     * 获取查询条件
     *
     * @param categoryQueryRequest
     * @return
     */
    QueryWrapper<Category> getQueryWrapper(CategoryQueryRequest categoryQueryRequest);

    /**
     * 获取商品分类封装
     *
     * @param category
     * @param request
     * @return
     */
    CategoryVO getCategoryVO(Category category, HttpServletRequest request);

    /**
     * 分页获取商品分类封装
     *
     * @param categoryPage
     * @param request
     * @return
     */
    Page<CategoryVO> getCategoryVOPage(Page<Category> categoryPage, HttpServletRequest request);
}
