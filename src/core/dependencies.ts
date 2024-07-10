import * as Soap from "@soapjs/soap";
import { SoapMongo, MongoSource } from "@soapjs/soap-node-mongo";
import { Container } from "inversify";

import { Config } from "./config";
import {
  OrdersController,
  ProductsController,
  StockController,
} from "../features";
import { ProductRepository } from "../features/domain/repositories/product.repository";
import { OrderRepository } from "../features/domain/repositories/order.repository";
import {
  AddOrderUseCase,
  AddProductUseCase,
  ListProductsUseCase,
  RestockProductUseCase,
  SellProductUseCase,
} from "../features/domain/use-cases";
import { ProductMongoModel } from "../features/data/dto/product.dto";
import { OrderMongoModel } from "../features/data/dto/order.dto";
import { ProductMongoMapper } from "../features/data";
import { OrderMongoMapper } from "../features/data/mappers/order.mongo-mapper";

/**
 * @class Dependencies
 * Implements the Soap.Dependencies interface for configuring dependencies in the application.
 * @implements {Soap.Dependencies<Container>}
 */
export class Dependencies implements Soap.Dependencies<Container> {
  /**
   * Creates an instance of Dependencies.
   * @param {Container} container - The inversion of control (IoC) container for managing dependencies.
   * @param {Config} config - The configuration required to initialize the contract and other dependencies.
   */
  constructor(public readonly container: Container, private config: Config) {}

  /**
   * Configures the dependencies by initializing the contract and binding implementations to interfaces.
   * @returns {Promise<void>} A promise that resolves when the configuration is complete.
   */
  async configure(): Promise<void> {
    const mongoSource = await SoapMongo.create(this.config.mongo);

    const productsContext = new Soap.DatabaseContext(
      new MongoSource<ProductMongoModel>(mongoSource, "products", {
        modelClass: ProductMongoModel,
      }),
      new ProductMongoMapper()
    );
    const ordersContext = new Soap.DatabaseContext(
      new MongoSource<OrderMongoModel>(mongoSource, "orders", {
        modelClass: OrderMongoModel,
      }),
      new OrderMongoMapper()
    );

    this.container
      .bind<ProductRepository>(ProductRepository.Token)
      .toConstantValue(new Soap.RepositoryImpl(productsContext));
    this.container
      .bind<OrderRepository>(OrderRepository.Token)
      .toConstantValue(new Soap.RepositoryImpl(ordersContext));

    this.container
      .bind<ProductsController>(ProductsController.Token)
      .to(ProductsController);
    this.container
      .bind<StockController>(StockController.Token)
      .to(StockController);
    this.container
      .bind<OrdersController>(OrdersController.Token)
      .to(OrdersController);

    this.container
      .bind<AddOrderUseCase>(AddOrderUseCase.Token)
      .to(AddOrderUseCase);
    this.container
      .bind<AddProductUseCase>(AddProductUseCase.Token)
      .to(AddProductUseCase);
    this.container
      .bind<ListProductsUseCase>(ListProductsUseCase.Token)
      .to(ListProductsUseCase);
    this.container
      .bind<RestockProductUseCase>(RestockProductUseCase.Token)
      .to(RestockProductUseCase);
    this.container
      .bind<SellProductUseCase>(SellProductUseCase.Token)
      .to(SellProductUseCase);

    this.container
      .bind<ProductsController>(ProductsController.Token)
      .to(ProductsController);
  }
}
