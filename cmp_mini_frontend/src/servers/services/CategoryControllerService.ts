/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_CategoryVO_ } from '../models/BaseResponse_CategoryVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Category_ } from '../models/BaseResponse_Page_Category_';
import type { BaseResponse_Page_CategoryVO_ } from '../models/BaseResponse_Page_CategoryVO_';
import type { CategoryAddRequest } from '../models/CategoryAddRequest';
import type { CategoryQueryRequest } from '../models/CategoryQueryRequest';
import type { CategoryUpdateRequest } from '../models/CategoryUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoryControllerService {
    /**
     * addCategory
     * @param categoryAddRequest categoryAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCategoryUsingPost(
        categoryAddRequest: CategoryAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/category/add',
            body: categoryAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteCategory
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCategoryUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/category/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getCategoryVOById
     * @param id id
     * @returns BaseResponse_CategoryVO_ OK
     * @throws ApiError
     */
    public static getCategoryVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_CategoryVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dev-api/category/get/vo',
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
     * listCategoryByPage
     * @param categoryQueryRequest categoryQueryRequest
     * @returns BaseResponse_Page_Category_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCategoryByPageUsingPost(
        categoryQueryRequest: CategoryQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Category_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/category/list/page',
            body: categoryQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCategoryVOByPage
     * @param categoryQueryRequest categoryQueryRequest
     * @returns BaseResponse_Page_CategoryVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCategoryVoByPageUsingPost(
        categoryQueryRequest: CategoryQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CategoryVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/category/list/page/vo',
            body: categoryQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateCategory
     * @param categoryUpdateRequest categoryUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateCategoryUsingPost(
        categoryUpdateRequest: CategoryUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/category/update',
            body: categoryUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
