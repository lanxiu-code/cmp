package com.cmp.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.data.redis.domain.geo.GeoLocation;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class RedisUtils {
    @Resource
    private StringRedisTemplate stringRedisTemplate;
    private static final String LUA_INCR_EXPIRE =
            "local key,ttl=KEYS[1],ARGV[1] \n" +
                    " \n" +
                    "if redis.call('EXISTS',key)==0 then   \n" +
                    "  redis.call('SETEX',key,ttl,1) \n" +
                    "  return 1 \n" +
                    "else \n" +
                    "  return tonumber(redis.call('INCR',key)) \n" +
                    "end ";
    /**
     * 自增int
     *
     * @param key  键
     * @param time 时间(秒)
     */
    public Integer integerInc(String key, int time, TimeUnit unit) {
        RedisScript<Long> redisScript = new DefaultRedisScript<>(LUA_INCR_EXPIRE, Long.class);
        Long result = stringRedisTemplate.execute(redisScript, Collections.singletonList(key), String.valueOf(unit.toSeconds(time)));
        try {
            return Integer.parseInt(result.toString());
        } catch (Exception e) {
            this.del(key);
            throw e;
        }
    }
    /**
     * 写入缓存
     *
     * @param key   redis键
     * @param value redis值
     * @return 是否成功
     */
    public boolean set(String key, String value) {
        boolean result = false;
        try {
            ValueOperations<String, String> operations = stringRedisTemplate.opsForValue();
            operations.set(key, value);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    /*
    * 写入地理位置
    * */
    public boolean setGeo(String key,List<RedisGeoCommands.GeoLocation<String>> locationList) {
        boolean result = false;
        try {
            GeoOperations<String, String> geoOperations = stringRedisTemplate.opsForGeo();
            geoOperations.add(key, locationList);
            result = true;
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return result;
    }
    /*
    * 搜索附近
    * */
    public GeoResults<RedisGeoCommands.GeoLocation<String>> getGeo(String key,Point point,Double radius) {
        // radius 是半径
        Distance distance = new Distance(radius, RedisGeoCommands.DistanceUnit.KILOMETERS);
        Circle circle = new Circle(point,distance);
        GeoOperations<String, String> geoOperations = stringRedisTemplate.opsForGeo();
        return geoOperations.radius(key, circle);
    }
    /*
    * 计算两点距离
    * */
    public Distance getDistance(String key,String member1,String member2) {
        GeoOperations<String, String> geoOperations = stringRedisTemplate.opsForGeo();
        return geoOperations.distance(key, member1, member2, RedisGeoCommands.DistanceUnit.KILOMETERS);
    }
    /*
    * 批量写入缓存
    * */
    public boolean set(Map<String, String> kvs) {
        boolean result = false;
        try {
            ValueOperations<String, String> operations = stringRedisTemplate.opsForValue();
            operations.multiSet(kvs);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    /**
     * 写入缓存设置时效时间
     *
     * @param key   redis键
     * @param value redis值
     * @return 是否成功
     */
    public boolean set(final String key, String value, Long expireTime) {
        boolean result = false;
        try {
            ValueOperations<String, String> operations = stringRedisTemplate.opsForValue();
            operations.set(key, value);
            stringRedisTemplate.expire(key, expireTime, TimeUnit.SECONDS);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    /**
     * 批量删除对应的键值对
     *
     * @param keys Redis键名数组
     */
    public void removeByKeys(final String... keys) {
        for (String key : keys) {
            del(key);
        }
    }
    /**
     * 读取缓存
     *
     * @param key Redis键名
     * @return 是否存在
     */
    public String get(final String key) {
        String result = null;
        ValueOperations<String, String> operations = stringRedisTemplate.opsForValue();
        result = operations.get(key);
        return result;
    }
    /**
     * 删除缓存
     *
     * @param keys
     */
    public void del(String... keys) {
        if (keys != null && keys.length > 0) {
            if (keys.length == 1) {
                Boolean result = stringRedisTemplate.delete(keys[0]);
                log.debug("--------------------------------------------");
                log.debug("删除缓存：" + keys[0] + "，结果：" + result);
            } else {
                Set<String> keySet = new HashSet<>();
                for (String key : keys) {
                    Set<String> stringSet = stringRedisTemplate.keys(key);
                    if (Objects.nonNull(stringSet) && !stringSet.isEmpty()) {
                        keySet.addAll(stringSet);
                    }
                }
                Long count = stringRedisTemplate.delete(keySet);
                log.debug("--------------------------------------------");
                log.debug("成功删除缓存：" + keySet);
                log.debug("缓存删除数量：" + count + "个");
            }
            log.debug("--------------------------------------------");
        }
    }
}
