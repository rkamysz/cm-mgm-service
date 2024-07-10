import { ExpressRouter } from "@soapjs/soap-express";
import { Container } from "inversify";
import {
  AddOrderRoute,
  AddProductRoute,
  ListProductsRoute,
  RestockProductRoute,
  SellProductRoute,
} from "../api";

/**
 * @class Router
 * Extends the ExpressRouter class to set up application routes.
 * @extends {ExpressRouter<Container>}
 */
export class Router extends ExpressRouter {
  constructor(private container: Container, prefix = "api", version = "1") {
    super(prefix, version);
  }

  /**
   * Sets up the application routes by mounting specific route handlers.
   * @returns {void}
   */
  setupRoutes(): void {
    this.mount(AddProductRoute.create(this.container));
    this.mount(ListProductsRoute.create(this.container));
    this.mount(SellProductRoute.create(this.container));
    this.mount(RestockProductRoute.create(this.container));
    this.mount(AddOrderRoute.create(this.container));
  }
}
