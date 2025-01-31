package com.cmp.common;

import cn.hutool.captcha.GifCaptcha;
import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.lang.UUID;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.IdcardUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Hutools {
    public static void main(String[] args) {
        GifCaptcha gifCaptcha = new GifCaptcha(80,40);
        gifCaptcha.createCode();
        String code1 = gifCaptcha.getCode();
        gifCaptcha.createCode();
        String code2 = gifCaptcha.getCode();
        log.info("code1: " + code1 + " code2: " + code2);
        log.info(String.valueOf(gifCaptcha.verify(code1)));
        log.info(String.valueOf(gifCaptcha.verify(code2)));
    }
}
