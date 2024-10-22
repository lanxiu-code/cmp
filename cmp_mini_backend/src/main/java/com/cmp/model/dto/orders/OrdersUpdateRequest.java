package com.cmp.model.dto.orders;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 更新订单请求
 *
 * cmp
 *
 */
@Data
public class OrdersUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 订单状态(0-待完成,1-已完成，2-已取消)
     */
    private Integer status;

    private static final long serialVersionUID = 1L;
}