package com.cmp.model.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.cmp.model.entity.Category;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;

/**
 * 商品分类视图
 *
 * cmp
 *
 */
@Data
public class CategoryVO implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 分类名称
     */
    private String name;

    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 更新时间
     */
    private Date updateTime;
    /**
     * 封装类转对象
     *
     * @param categoryVO
     * @return
     */
    public static Category voToObj(CategoryVO categoryVO) {
        if (categoryVO == null) {
            return null;
        }
        Category category = new Category();
        BeanUtils.copyProperties(categoryVO, category);
        return category;
    }

    /**
     * 对象转封装类
     *
     * @param category
     * @return
     */
    public static CategoryVO objToVo(Category category) {
        if (category == null) {
            return null;
        }
        CategoryVO categoryVO = new CategoryVO();
        BeanUtils.copyProperties(category, categoryVO);
        return categoryVO;
    }
}
