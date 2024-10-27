package com.cmp.model.vo;

import com.cmp.model.entity.Goods;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 商品视图
 *
 * cmp
 *
 */
@Data
public class GoodsVO implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 商品名称
     */
    private String name;

    /**
     * 商品分类id
     */
    private Long categoryId;
    /*
    * 数量
    * */
    private Integer quantity;
    /**
     * 商品价格
     */
    private BigDecimal price;
    /**
     * 商品描述
     */
    private String description;
    /**
     * 商品库存
     */
    private Integer stock;
    /**
     * 商品图片地址
     */
    private String image;

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
     * @param goodsVO
     * @return
     */
    public static Goods voToObj(GoodsVO goodsVO) {
        if (goodsVO == null) {
            return null;
        }
        Goods goods = new Goods();
        BeanUtils.copyProperties(goodsVO, goods);
        return goods;
    }

    /**
     * 对象转封装类
     *
     * @param goods
     * @return
     */
    public static GoodsVO objToVo(Goods goods) {
        if (goods == null) {
            return null;
        }
        GoodsVO goodsVO = new GoodsVO();
        BeanUtils.copyProperties(goods, goodsVO);
        return goodsVO;
    }
}
