package com.cmp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.common.ErrorCode;
import com.cmp.constant.CommonConstant;
import com.cmp.exception.ThrowUtils;
import com.cmp.mapper.CategoryMapper;
import com.cmp.model.dto.category.CategoryQueryRequest;
import com.cmp.model.entity.Category;
import com.cmp.model.vo.CategoryVO;
import com.cmp.service.CategoryService;
import com.cmp.utils.SqlUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author 蓝朽
* @description 针对表【category(商品分类)】的数据库操作Service实现
* @createDate 2024-10-21 15:50:24
*/
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category>
    implements CategoryService {
    @Resource
    private CategoryMapper categoryMapper;
    @Override
    public void validCategory(Category category, boolean add) {
        ThrowUtils.throwIf(category == null, ErrorCode.PARAMS_ERROR);
        Long id = category.getId();
        String name = category.getName();
        // 创建数据时，参数不能为空
        if (add) {
            ThrowUtils.throwIf(StringUtils.isBlank(name), ErrorCode.PARAMS_ERROR);
        }
        // 修改数据时，有参数则校验
        if (StringUtils.isNotBlank(name)) {
            ThrowUtils.throwIf(name.length() > 80, ErrorCode.PARAMS_ERROR, "标题过长");
        }
    }

    @Override
    public QueryWrapper<Category> getQueryWrapper(CategoryQueryRequest categoryQueryRequest) {
        QueryWrapper<Category> queryWrapper = new QueryWrapper<>();
        if (categoryQueryRequest == null) {
            return queryWrapper;
        }
        Long id = categoryQueryRequest.getId();
        String sortField = categoryQueryRequest.getSortField();
        String sortOrder = categoryQueryRequest.getSortOrder();
        // 精确查询
        queryWrapper.eq(ObjectUtil.isNotEmpty(id), "id", id);
        // 排序规则
        queryWrapper.orderBy(SqlUtils.validSortField(sortField),
                sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public CategoryVO getCategoryVO(Category category, HttpServletRequest request) {
        // 对象转封装类
        return CategoryVO.objToVo(category);
    }

    @Override
    public Page<CategoryVO> getCategoryVOPage(Page<Category> categoryPage, HttpServletRequest request) {
        List<Category> categoryList = categoryPage.getRecords();
        Page<CategoryVO> categoryVOPage = new Page<>(categoryPage.getCurrent(), categoryPage.getSize(), categoryPage.getTotal());
        if (CollUtil.isEmpty(categoryList)) {
            return categoryVOPage;
        }
        // 对象列表 => 封装对象列表
        List<CategoryVO> categoryVOList = categoryList.stream().map(CategoryVO::objToVo).collect(Collectors.toList());
        categoryVOPage.setRecords(categoryVOList);
        return categoryVOPage;
    }
}




