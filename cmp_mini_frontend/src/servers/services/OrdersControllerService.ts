/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_OrdersVO_ } from '../models/BaseResponse_OrdersVO_';
import type { BaseResponse_Page_Orders_ } from '../models/BaseResponse_Page_Orders_';
import type { BaseResponse_Page_OrdersVO_ } from '../models/BaseResponse_Page_OrdersVO_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { OrdersAddRequest } from '../models/OrdersAddRequest';
import type { OrdersQueryRequest } from '../models/OrdersQueryRequest';
import type { OrdersUpdateRequest } from '../models/OrdersUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersControllerService {
    /**
     * addOrders
     * @param ordersAddRequest ordersAddRequest
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addOrdersUsingPost(
        ordersAddRequest: OrdersAddRequest,
    ): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/orders/add',
            body: ordersAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteOrders
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteOrdersUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/orders/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getOrdersVOById
     * @param id id
     * @returns BaseResponse_OrdersVO_ OK
     * @throws ApiError
     */
    public static getOrdersVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_OrdersVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dev-api/orders/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listOrdersByPage
     * @param ordersQueryRequest ordersQueryRequest
     * @returns BaseResponse_Page_Orders_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listOrdersByPageUsingPost(
        ordersQueryRequest: OrdersQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Orders_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/orders/list/page',
            body: ordersQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listOrdersVOByPage
     * @param ordersQueryRequest ordersQueryRequest
     * @returns BaseResponse_Page_OrdersVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listOrdersVoByPageUsingPost(
        ordersQueryRequest: OrdersQueryRequest,
    ): CancelablePromise<BaseResponse_Page_OrdersVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/orders/list/page/vo',
            body: ordersQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyOrdersVOByPage
     * @param ordersQueryRequest ordersQueryRequest
     * @returns BaseResponse_Page_OrdersVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyOrdersVoByPageUsingPost(
        ordersQueryRequest: OrdersQueryRequest,
    ): CancelablePromise<BaseResponse_Page_OrdersVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/orders/my/list/page/vo',
            body: ordersQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateOrders
     * @param ordersUpdateRequest ordersUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateOrdersUsingPost(
        ordersUpdateRequest: OrdersUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/orders/update',
            body: ordersUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
