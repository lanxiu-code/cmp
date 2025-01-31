package com.cmp.model.vo;

import lombok.Builder;
import lombok.Data;

/*
* 登录返回信息
* */
@Data
@Builder
public class LoginInfo {
    String token;
}
