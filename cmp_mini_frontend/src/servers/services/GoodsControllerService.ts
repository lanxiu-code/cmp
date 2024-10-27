/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_GoodsVO_ } from '../models/BaseResponse_GoodsVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Goods_ } from '../models/BaseResponse_Page_Goods_';
import type { BaseResponse_Page_GoodsVO_ } from '../models/BaseResponse_Page_GoodsVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { GoodsAddRequest } from '../models/GoodsAddRequest';
import type { GoodsQueryRequest } from '../models/GoodsQueryRequest';
import type { GoodsUpdateRequest } from '../models/GoodsUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoodsControllerService {
    /**
     * addGoods
     * @param goodsAddRequest goodsAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addGoodsUsingPost(
        goodsAddRequest: GoodsAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/goods/add',
            body: goodsAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteGoods
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteGoodsUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/goods/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getGoodsVOById
     * @param id id
     * @returns BaseResponse_GoodsVO_ OK
     * @throws ApiError
     */
    public static getGoodsVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_GoodsVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dev-api/goods/get/vo',
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
     * listGoodsByPage
     * @param goodsQueryRequest goodsQueryRequest
     * @returns BaseResponse_Page_Goods_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listGoodsByPageUsingPost(
        goodsQueryRequest: GoodsQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Goods_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/goods/list/page',
            body: goodsQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listGoodsVOByPage
     * @param goodsQueryRequest goodsQueryRequest
     * @returns BaseResponse_Page_GoodsVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listGoodsVoByPageUsingPost(
        goodsQueryRequest: GoodsQueryRequest,
    ): CancelablePromise<BaseResponse_Page_GoodsVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/goods/list/page/vo',
            body: goodsQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateGoods
     * @param goodsUpdateRequest goodsUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateGoodsUsingPost(
        goodsUpdateRequest: GoodsUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/goods/update',
            body: goodsUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
