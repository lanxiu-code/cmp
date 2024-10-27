package com.cmp.model.vo;

import cn.hutool.json.JSONUtil;
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
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 标签列表
     */
    private List<String> tagList;

    /**
     * 创建用户信息
     */
    private UserVO user;

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
        List<String> tagList = userInfoVO.getTagList();
        userInfo.setTags(JSONUtil.toJsonStr(tagList));
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
        userInfoVO.setTagList(JSONUtil.toList(userInfo.getTags(), String.class));
        return userInfoVO;
    }
}
