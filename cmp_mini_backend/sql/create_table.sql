# 数据库初始化
# cmp
#

-- 创建库
create database if not exists cmp;

-- 切换库
use cmp;

-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userAccount  varchar(256)                           not null comment '账号',
    userPassword varchar(512)                           not null comment '密码',
    userGender   tinyint      default 0                 null comment '性别（1-男, 0-女）',
    unionId      varchar(256)                           null comment '微信开放平台id',
    mpOpenId     varchar(256)                           null comment '公众号openId',
    userName     varchar(256)                           null comment '用户昵称',
    userAvatar   varchar(1024)                          null comment '用户头像',
    userProfile  varchar(512)                           null comment '用户简介',
    userRole     varchar(256) default 'user'            not null comment '用户角色：user/admin/ban',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_unionId (unionId)
) comment '用户' collate = utf8mb4_unicode_ci;

-- 商品分类表
create table if not exists category
(
    id           bigint auto_increment comment 'id' primary key,
    name         varchar(128)                           not null comment '分类名称',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
) comment '商品分类' collate = utf8mb4_unicode_ci;

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

-- 订单表
create table if not exists orders
(
    id           bigint auto_increment comment 'id' primary key,
    orderNo      varchar(128)                           not null comment '订单编号',
    uid          bigint                                  not null comment '用户id',
    addressId    bigint                                 not null comment '收货地址id',
    quantity     int                                    not null comment '商品数量',
    totalPrice   decimal(10, 2)                         not null comment '订单总金额',
    remark       varchar(256)                           null comment '订单备注',
    status        int     default 0                     not null comment '订单状态(0-待完成,1-已完成，2-已取消)',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_uid (uid),
    index idx_orderNo (orderNo),
    index idx_addressId (addressId)
) comment '订单' collate = utf8mb4_unicode_ci;

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

-- 地址表
create table if not exists address
(
    id           bigint auto_increment comment 'id' primary key,
    uid          bigint                                 not null comment '用户id',
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

-- 购物车表
create table if not exists carts
(
    id           bigint auto_increment comment 'id' primary key,
    uid          bigint                                 not null comment '用户id',
    goodsId     bigint                                 not null comment '商品id',
    quantity     int                                    not null comment '商品数量',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除',
    index idx_uid (uid),
    index idx_goodsId (goodsId)
) comment '购物车' collate = utf8mb4_unicode_ci;



##### 待办
-- 支付表
create table if not exists payment
(
    id           bigint auto_increment comment 'id' primary key,
    orderId      bigint                                 not null comment '订单id',
    amount       decimal(10, 2)                         not null comment '支付金额',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
) comment '支付' collate = utf8mb4_unicode_ci;

-- 退款表
create table if not exists refund
(
    id           bigint auto_increment comment 'id' primary key,
    orderId      bigint                                 not null comment '订单id',
    amount       decimal(10, 2)                         not null comment '退款金额',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                 not null comment '是否删除'
) comment '退款' collate = utf8mb4_unicode_ci;

