/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressVO } from './AddressVO';
import type { OrderItem } from './OrderItem';
export type Page_AddressVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<AddressVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

