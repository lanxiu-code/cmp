/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_CartsVO_ } from '../models/BaseResponse_CartsVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Carts_ } from '../models/BaseResponse_Page_Carts_';
import type { BaseResponse_Page_CartsVO_ } from '../models/BaseResponse_Page_CartsVO_';
import type { CartsAddRequest } from '../models/CartsAddRequest';
import type { CartsEditRequest } from '../models/CartsEditRequest';
import type { CartsQueryRequest } from '../models/CartsQueryRequest';
import type { CartsUpdateRequest } from '../models/CartsUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartsControllerService {
    /**
     * addCarts
     * @param cartsAddRequest cartsAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCartsUsingPost(
        cartsAddRequest: CartsAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/add',
            body: cartsAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * clearCarts
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static clearCartsUsingPost(): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/clear',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteCarts
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCartsUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editCarts
     * @param cartsEditRequest cartsEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editCartsUsingPost(
        cartsEditRequest: CartsEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/edit',
            body: cartsEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getCartsVOById
     * @param id id
     * @returns BaseResponse_CartsVO_ OK
     * @throws ApiError
     */
    public static getCartsVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_CartsVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dev-api/carts/get/vo',
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
     * listCartsByPage
     * @param cartsQueryRequest cartsQueryRequest
     * @returns BaseResponse_Page_Carts_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCartsByPageUsingPost(
        cartsQueryRequest: CartsQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Carts_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/list/page',
            body: cartsQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCartsVOByPage
     * @param cartsQueryRequest cartsQueryRequest
     * @returns BaseResponse_Page_CartsVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCartsVoByPageUsingPost(
        cartsQueryRequest: CartsQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CartsVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/list/page/vo',
            body: cartsQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyCartsVOByPage
     * @param cartsQueryRequest cartsQueryRequest
     * @returns BaseResponse_Page_CartsVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyCartsVoByPageUsingPost(
        cartsQueryRequest: CartsQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CartsVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/my/list/page/vo',
            body: cartsQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateCarts
     * @param cartsUpdateRequest cartsUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateCartsUsingPost(
        cartsUpdateRequest: CartsUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/carts/update',
            body: cartsUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
