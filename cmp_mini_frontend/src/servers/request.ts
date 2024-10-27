/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AddressControllerService } from './services/AddressControllerService';
import { CartsControllerService } from './services/CartsControllerService';
import { CategoryControllerService } from './services/CategoryControllerService';
import { GoodsControllerService } from './services/GoodsControllerService';
import { OrdersControllerService } from './services/OrdersControllerService';
import { UserControllerService } from './services/UserControllerService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class request {
    public readonly addressController: AddressControllerService;
    public readonly cartsController: CartsControllerService;
    public readonly categoryController: CategoryControllerService;
    public readonly goodsController: GoodsControllerService;
    public readonly ordersController: OrdersControllerService;
    public readonly userController: UserControllerService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://127.0.0.1:8101/dev-api',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.addressController = new AddressControllerService(this.request);
        this.cartsController = new CartsControllerService(this.request);
        this.categoryController = new CategoryControllerService(this.request);
        this.goodsController = new GoodsControllerService(this.request);
        this.ordersController = new OrdersControllerService(this.request);
        this.userController = new UserControllerService(this.request);
    }
}

