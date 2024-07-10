import { Request, Response } from "express";
import { GetRoute, HttpError, Result, RouteIO } from "@soapjs/soap";
import { Container } from "inversify";
import { StockController } from "../../features";

type RestockProductModel = {
  id: string;
};

export class RestockProductRouteIO
  implements RouteIO<string, unknown, Request, Response>
{
  fromRequest(request: Request<RestockProductModel>): string {
    const {
      params: { id },
    } = request;

    if (!id) {
      throw new HttpError(400, 'Missing "id" in request');
    }

    return id;
  }

  toResponse(
    response: Response<RestockProductModel[] | string>,
    result: Result
  ): void {
    if (result.isFailure) {
      response.status(500).send(result.failure.error.message);
    } else {
      response.status(200).send("OK");
    }
  }
}
export class RestockProductRoute extends GetRoute {
  static create(container: Container) {
    const controller = container.get<StockController>(
      StockController.Token
    );
    const handler = controller.restockProduct.bind(controller);

    return new RestockProductRoute("/products/:id/restock", handler, {
      io: new RestockProductRouteIO(),
    });
  }
}
