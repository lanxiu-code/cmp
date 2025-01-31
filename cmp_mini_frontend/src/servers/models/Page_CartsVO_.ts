/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartsVO } from './CartsVO';
import type { OrderItem } from './OrderItem';
export type Page_CartsVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CartsVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

