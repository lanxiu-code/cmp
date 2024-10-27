/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoodsVO } from './GoodsVO';
import type { OrderItem } from './OrderItem';
export type Page_GoodsVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<GoodsVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

