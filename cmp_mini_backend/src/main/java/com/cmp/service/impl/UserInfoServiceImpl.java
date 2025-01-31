package com.cmp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cmp.model.entity.UserInfo;
import com.cmp.service.UserInfoService;
import com.cmp.mapper.UserInfoMapper;
import org.springframework.stereotype.Service;

/**
* @author 蓝朽
* @description 针对表【user_info(用户信息)】的数据库操作Service实现
* @createDate 2024-10-26 09:46:23
*/
@Service
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo>
    implements UserInfoService{

}




