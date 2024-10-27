package com.cmp.model.vo;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.cmp.model.entity.UserInfo;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 用户信息视图
 *
 * cmp
 *
 */
@Data
public class UserInfoVO implements Serializable {

    /**
     * id
     */
    private Long id;
    /**
     * 姓名
     */
    private String name;

    /**
     * 电话
     */
    private String phone;

    /**
     * 地址
     */
    private String address;

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
     * @param userInfoVO
     * @return
     */
    public static UserInfo voToObj(UserInfoVO userInfoVO) {
        if (userInfoVO == null) {
            return null;
        }
        UserInfo userInfo = new UserInfo();
        BeanUtils.copyProperties(userInfoVO, userInfo);
        return userInfo;
    }

    /**
     * 对象转封装类
     *
     * @param userInfo
     * @return
     */
    public static UserInfoVO objToVo(UserInfo userInfo) {
        if (userInfo == null) {
            return null;
        }
        UserInfoVO userInfoVO = new UserInfoVO();
        BeanUtils.copyProperties(userInfo, userInfoVO);
        return userInfoVO;
    }
}
