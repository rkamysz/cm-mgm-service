import { Request, Response } from "express";
import { PostRoute, Result, RouteIO } from "@soapjs/soap";
import { Container } from "inversify";
import { Product } from "../../features/domain/entities/product";
import { PriceUtils } from "../../core/price.utils";
import { AddProductModel, AddProductSchema } from "./products.schemas";
import { ProductsController } from "../../features";

export class AddProductRouteIO
  implements RouteIO<Product, AddProductModel, Request, Response>
{
  toResponse(response: Response, result: Result<AddProductModel>): void {
    if (result.isFailure) {
      response.status(500).send(result.failure.error.message);
    } else {
      response.status(200).send("Product added");
    }
  }

  fromRequest(request: Request<unknown, unknown, AddProductModel>): Product {
    const {
      body: { name, description, price, stock },
    } = request;

    const { error } = AddProductSchema.validate(request.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    return new Product(
      null,
      name,
      description,
      PriceUtils.convertPriceToNumber(price),
      stock
    );
  }
}

export class AddProductRoute extends PostRoute {
  static create(container: Container) {
    const controller = container.get<ProductsController>(
      ProductsController.Token
    );
    const handler = controller.addProduct.bind(controller);

    return new AddProductRoute("/products", handler, {
      io: new AddProductRouteIO(),
    });
  }
}
