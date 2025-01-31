# 需求分析
需求：点单，付款，自己配送

# 流程图 
![画板](https://cdn.nlark.com/yuque/0/2024/jpeg/35349136/1728975219613-579872ed-7e24-4d61-988b-a14939682166.jpeg)

# 时序图
![画板](https://cdn.nlark.com/yuque/0/2024/jpeg/35349136/1728975352481-ebf497a9-35d0-4016-a6e0-7b1e4dfe73c7.jpeg)



# 技术选型
## 小程序端
+ Taro 框架
+ MutUI React 组件库

## 中后台
+ Vue-element-ui
    - 文档：[介绍 | vue-element-admin (panjiachen.github.io)](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)

## 后端
+ Spring
+ Spring Boot
+ Mybatis  plus
+ Mysql
+ sa-token

### 数据库表
#### 分类表
```sql
-- 分类表
create table if not exists category
(
    id           bigint auto_increment comment 'id' primary key,
    name         varchar(128)                           not null comment '分类名称',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
) comment '商品分类' collate = utf8mb4_unicode_ci;

```



#### 用户信息表
```sql
-- 用户信息表
create table if not exists user_info
(
    id           bigint auto_increment comment 'id' primary key,
    uid          bigint                                 not null comment '用户id',
    name         varchar(128)                           not null comment '姓名',
    phone        varchar(128)                           not null comment '电话',
    address      varchar(256)  default '未填写'          not null comment '地址',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_uid (uid)
) comment '用户信息' collate = utf8mb4_unicode_ci;
```



#### 商品表
```sql
-- 商品表
create table if not exists goods
(
    id           bigint auto_increment comment 'id' primary key,
    name         varchar(128)                           not null comment '商品名称',
    categoryId   bigint                                 not null comment '商品分类id',
    supplierId   bigint                                 not null comment '供应商id',
    price        decimal(10, 2)                         not null comment '商品价格',
    stock        int                                    not null comment '商品库存',
    description  varchar(1024)                          null comment '商品描述',
    image        varchar(1024)                          null comment '商品图片地址',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_categoryId (categoryId),
    index idx_supplierId (supplierId)
) comment '商品' collate = utf8mb4_unicode_ci;
```



#### 订单表
```sql
-- 订单表
create table if not exists orders
(
    id           bigint auto_increment comment 'id' primary key,
    orderNo      varchar(128)                           not null comment '订单编号',
    uid          bigint                                  not null comment '用户id',
    addressId    bigint                                 not null comment '收货地址id',
    quantity     int                                    not null comment '商品数量',
    totalPrice   decimal(10, 2)                         not null comment '订单总金额',
    remark       varchar(256) default '无'                 null comment '订单备注',  
    status        int     default 0                     not null comment '订单状态(0-待完成,1-已完成，2-已取消)',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_uid (uid),
    index idx_orderNo (orderNo),
    index idx_addressId (addressId)
) comment '订单' collate = utf8mb4_unicode_ci;
```

#### 订单商品表
```sql
-- 订单商品表
create table if not exists order_goods
(
    id           bigint auto_increment comment 'id' primary key,
    orderId     bigint                                 not null comment '订单id',
    goodsId     bigint                                 not null comment '商品id',
    quantity     int                                    not null comment '商品数量',
    price        decimal(10, 2)                         not null comment '商品价格',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    foreign key (orderId) references orders (id),
    foreign key (goodsId) references goods (id)
) comment '订单商品' collate = utf8mb4_unicode_ci;
```

#### 供应商表
```sql
-- 供应商表
create table if not exists supplier
(
    id           bigint auto_increment comment 'id' primary key,
    name         varchar(128)                           not null comment '供应商名称',
    contact      varchar(128)                           not null comment '供应商联系人',
    phone        varchar(128)                           not null comment '供应商电话',
    address      varchar(256)                           not null comment '供应商地址',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
) comment '订单' collate = utf8mb4_unicode_ci;
```



#### 地址表
```sql
-- 地址表
create table if not exists address
(
    id           bigint auto_increment comment 'id' primary key,
    uid          bigint                                 not null comment '用户id',
    name         varchar(128)                           not null comment '收货人姓名',
    phone        varchar(128)                            not null comment '收货人电话',
    provinceName varchar(128)                           not null comment '省份名称',
    countyName   varchar(128)                           not null comment '城市名称',
    cityName     varchar(128)                           not null comment '县名称',
    townName    varchar(128)                           not null comment '乡镇名称',
    detail       varchar(256)                           not null comment '详细地址',
    isDefault   tinyint(1)                             not null comment '是否默认地址(0-否，1-是)',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_uid (uid)
) comment '地址' collate = utf8mb4_unicode_ci;
```



#### 购物车表
```sql
-- 购物车表
create table if not exists carts
(
    id           bigint auto_increment comment 'id' primary key,
    uid          bigint                                 not null comment '用户id',
    goodsId     bigint                                  not null comment '商品id',
    quantity     int                                    not null comment '商品数量',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_uid (uid),
    index idx_goodsId (goodsId)
) comment '购物车' collate = utf8mb4_unicode_ci;
```

# 阶段一：开发小程序
页面：

+ ✅登录页面 
+ ✅购物页面
+ ✅订单页面
+ ✅订单详情
+ ✅我的页面
+ ✅地址管理
+ ✅添加地址
+ ✅添加备注
+ ✅订单结算

## 登录页面
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488037223-3e1afe37-4b66-4a5f-9f34-f345f049082e.png)

## 购物页面
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488056136-26eb9d50-9718-48aa-9a6a-327612e4aa37.png)

## 订单页面
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488076688-db864e44-f67e-4a0c-8bbd-a6e522e0beac.png)

## 订单详情
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488131891-b9825832-1cee-47d6-b053-86a7c2620fd6.png)

## 我的页面
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488092840-40b9b6c8-122f-43f8-8a45-842b8cc4728f.png)

## 地址管理
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488169886-51b498f0-527b-40d2-aad3-dbf00603d8a1.png)

## 添加地址
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488187940-2e13511b-6e99-4d59-956a-7a58e945b999.png)

## 订单备注
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488241204-d37a8e40-4e73-4138-88e8-4154ad3c747c.png)

## 订单结算
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729488209981-ebf9ebcc-65cc-4daf-908b-df7031502c72.png)

## 支付成功
![](https://cdn.nlark.com/yuque/0/2024/png/35349136/1729916111178-d32eaf3c-212c-459c-91a4-11aa2c360418.png)

# 阶段二：开发后端
接口开发

## 用户模块
+ ✅登录
+ ✅注册
+ ✅信息
+ 绑定手机



## 购物模块
+ ✅分类
    - 增删改查
+ ✅商品
    - 增删改查

## 订单模块
+ ✅订单
    - 增删改查
+ ✅订单商品
    - 增删改查

## 地址模块
+ ✅查询地址
+ ✅删除地址
+ ✅更新地址
+ ✅添加地址

## 购物车模块
+ ✅添加商品
+ ✅删除商品
+ ✅查询购物车

# 阶段三：小程序-后端联调
