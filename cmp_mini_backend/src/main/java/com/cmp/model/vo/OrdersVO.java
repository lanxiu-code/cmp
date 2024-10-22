package com.cmp.model.vo;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.cmp.model.entity.Orders;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 订单视图
 *
 * cmp
 *
 */
@Data
public class OrdersVO implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 订单编号
     */
    private String orderNo;

    /**
     * 用户id
     */
    private Long uid;

    /**
     * 商品
     */
    private List<GoodsVO> goodsList;
    /*
    * 地址
    * */
    private AddressVO address;
    /*
     * 订单备注
     * */
    private String remark;
    /**
     * 商品数量
     */
    private Integer quantity;

    /**
     * 订单总金额
     */
    private BigDecimal totalPrice;


    /**
     * 订单状态(0-待完成,1-已完成，2-已取消)
     */
    private Integer status;

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
     * @param ordersVO
     * @return
     */
    public static Orders voToObj(OrdersVO ordersVO) {
        if (ordersVO == null) {
            return null;
        }
        Orders orders = new Orders();
        BeanUtils.copyProperties(ordersVO, orders);
        return orders;
    }

    /**
     * 对象转封装类
     *
     * @param orders
     * @return
     */
    public static OrdersVO objToVo(Orders orders) {
        if (orders == null) {
            return null;
        }
        OrdersVO ordersVO = new OrdersVO();
        BeanUtils.copyProperties(orders, ordersVO);
        return ordersVO;
    }
}
