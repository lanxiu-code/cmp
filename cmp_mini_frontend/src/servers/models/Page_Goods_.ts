/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Goods } from './Goods';
import type { OrderItem } from './OrderItem';
export type Page_Goods_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Goods>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

