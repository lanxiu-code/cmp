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
import com.cmp.model.dto.category.CategoryAddRequest;
import com.cmp.model.dto.category.CategoryEditRequest;
import com.cmp.model.dto.category.CategoryQueryRequest;
import com.cmp.model.dto.category.CategoryUpdateRequest;
import com.cmp.model.entity.Category;
import com.cmp.model.entity.User;
import com.cmp.model.vo.CategoryVO;
import com.cmp.service.CategoryService;
import com.cmp.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 商品分类接口
 *
 * cmp
 *
 */
@RestController
@RequestMapping("/category")
@Slf4j
public class CategoryController {

    @Resource
    private CategoryService categoryService;

    @Resource
    private UserService userService;


    /**
     * 创建商品分类
     *
     * @param categoryAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Long> addCategory(@RequestBody CategoryAddRequest categoryAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(categoryAddRequest == null, ErrorCode.PARAMS_ERROR);
        Category category = new Category();
        BeanUtils.copyProperties(categoryAddRequest, category);
        // 数据校验
        categoryService.validCategory(category, true);
        // 写入数据库
        boolean result = categoryService.save(category);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // 返回新写入的数据 id
        long newCategoryId = category.getId();
        return ResultUtils.success(newCategoryId);
    }

    /**
     * 删除商品分类
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteCategory(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        Category oldCategory = categoryService.getById(id);
        ThrowUtils.throwIf(oldCategory == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = categoryService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 更新商品分类（仅管理员可用）
     *
     * @param categoryUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateCategory(@RequestBody CategoryUpdateRequest categoryUpdateRequest) {
        if (categoryUpdateRequest == null || categoryUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Category category = new Category();
        BeanUtils.copyProperties(categoryUpdateRequest, category);
        // 数据校验
        categoryService.validCategory(category, false);
        // 判断是否存在
        long id = categoryUpdateRequest.getId();
        Category oldCategory = categoryService.getById(id);
        ThrowUtils.throwIf(oldCategory == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = categoryService.updateById(category);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 根据 id 获取商品分类（封装类）
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<CategoryVO> getCategoryVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Category category = categoryService.getById(id);
        ThrowUtils.throwIf(category == null, ErrorCode.NOT_FOUND_ERROR);
        // 获取封装类
        return ResultUtils.success(categoryService.getCategoryVO(category, request));
    }

    /**
     * 分页获取商品分类列表（仅管理员可用）
     *
     * @param categoryQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Category>> listCategoryByPage(@RequestBody CategoryQueryRequest categoryQueryRequest) {
        long current = categoryQueryRequest.getCurrent();
        long size = categoryQueryRequest.getPageSize();
        // 查询数据库
        Page<Category> categoryPage = categoryService.page(new Page<>(current, size),
                categoryService.getQueryWrapper(categoryQueryRequest));
        return ResultUtils.success(categoryPage);
    }

    /**
     * 分页获取商品分类列表（封装类）
     *
     * @param categoryQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = UserConstant.DEFAULT_ROLE)
    public BaseResponse<Page<CategoryVO>> listCategoryVOByPage(@RequestBody CategoryQueryRequest categoryQueryRequest,
                                                               HttpServletRequest request) {
        long current = categoryQueryRequest.getCurrent();
        long size = categoryQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // 查询数据库
        Page<Category> categoryPage = categoryService.page(new Page<>(current, size),
                categoryService.getQueryWrapper(categoryQueryRequest));
        // 获取封装类
        return ResultUtils.success(categoryService.getCategoryVOPage(categoryPage, request));
    }

}
