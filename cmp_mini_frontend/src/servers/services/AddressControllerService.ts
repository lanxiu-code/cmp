/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressAddRequest } from '../models/AddressAddRequest';
import type { AddressEditRequest } from '../models/AddressEditRequest';
import type { AddressQueryRequest } from '../models/AddressQueryRequest';
import type { AddressUpdateRequest } from '../models/AddressUpdateRequest';
import type { BaseResponse_AddressVO_ } from '../models/BaseResponse_AddressVO_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Address_ } from '../models/BaseResponse_Page_Address_';
import type { BaseResponse_Page_AddressVO_ } from '../models/BaseResponse_Page_AddressVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddressControllerService {
    /**
     * addAddress
     * @param addressAddRequest addressAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addAddressUsingPost(
        addressAddRequest: AddressAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/address/add',
            body: addressAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteAddress
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteAddressUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/address/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editAddress
     * @param addressEditRequest addressEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editAddressUsingPost(
        addressEditRequest: AddressEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/address/edit',
            body: addressEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getAddressVOById
     * @param id id
     * @returns BaseResponse_AddressVO_ OK
     * @throws ApiError
     */
    public static getAddressVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_AddressVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dev-api/address/get/vo',
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
     * listAddressByPage
     * @param addressQueryRequest addressQueryRequest
     * @returns BaseResponse_Page_Address_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listAddressByPageUsingPost(
        addressQueryRequest: AddressQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Address_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/address/list/page',
            body: addressQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listAddressVOByPage
     * @param addressQueryRequest addressQueryRequest
     * @returns BaseResponse_Page_AddressVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listAddressVoByPageUsingPost(
        addressQueryRequest: AddressQueryRequest,
    ): CancelablePromise<BaseResponse_Page_AddressVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/address/list/page/vo',
            body: addressQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyAddressVOByPage
     * @param addressQueryRequest addressQueryRequest
     * @returns BaseResponse_Page_AddressVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyAddressVoByPageUsingPost(
        addressQueryRequest: AddressQueryRequest,
    ): CancelablePromise<BaseResponse_Page_AddressVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/address/my/list/page/vo',
            body: addressQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateAddress
     * @param addressUpdateRequest addressUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateAddressUsingPost(
        addressUpdateRequest: AddressUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dev-api/address/update',
            body: addressUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
