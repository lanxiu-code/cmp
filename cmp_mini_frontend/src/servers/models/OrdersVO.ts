/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressVO } from './AddressVO';
import type { GoodsVO } from './GoodsVO';
export type OrdersVO = {
    address?: AddressVO;
    createTime?: string;
    goodsList?: Array<GoodsVO>;
    id?: number;
    orderNo?: string;
    quantity?: number;
    remark?: string;
    status?: number;
    totalPrice?: number;
    uid?: number;
    updateTime?: string;
};

