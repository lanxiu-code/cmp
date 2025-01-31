/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Carts } from './Carts';
import type { OrderItem } from './OrderItem';
export type Page_Carts_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Carts>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

