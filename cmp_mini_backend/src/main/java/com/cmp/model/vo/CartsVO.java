package com.cmp.model.vo;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.cmp.model.entity.Carts;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 购物车视图
 *
 * cmp
 *
 */
@Data
public class CartsVO implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 商品
     */
    private GoodsVO goods;

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
     * @param cartsVO
     * @return
     */
    public static Carts voToObj(CartsVO cartsVO) {
        if (cartsVO == null) {
            return null;
        }
        Carts carts = new Carts();
        BeanUtils.copyProperties(cartsVO, carts);
        return carts;
    }

    /**
     * 对象转封装类
     *
     * @param carts
     * @return
     */
    public static CartsVO objToVo(Carts carts) {
        if (carts == null) {
            return null;
        }
        CartsVO cartsVO = new CartsVO();
        BeanUtils.copyProperties(carts, cartsVO);
        return cartsVO;
    }
}
