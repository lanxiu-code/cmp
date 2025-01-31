/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryVO } from './CategoryVO';
import type { OrderItem } from './OrderItem';
export type Page_CategoryVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CategoryVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

