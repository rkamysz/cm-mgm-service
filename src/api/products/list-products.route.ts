import { Request, Response } from "express";
import { GetRoute, Result, RouteIO } from "@soapjs/soap";
import { Container } from "inversify";
import { Product, ProductsController } from "../../features";

type ListProductsModel = {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
};

export class ListProductsRouteIO
  implements RouteIO<Product, unknown, Request, Response>
{
  toResponse(
    response: Response<ListProductsModel[] | string>,
    result: Result<Product[]>
  ): void {
    if (result.isFailure) {
      response.status(500).send(result.failure.error.message);
    } else {
      const { content: products } = result;

      const body = products.map((product) => product.toJson());

      response.status(200).send(body);
    }
  }
}
export class ListProductsRoute extends GetRoute {
  static create(container: Container) {
    const controller = container.get<ProductsController>(
      ProductsController.Token
    );
    const handler = controller.listProducts.bind(controller);

    return new ListProductsRoute("/products", handler, {
      io: new ListProductsRouteIO(),
    });
  }
}
