import { Request, Response } from "express";
import { GetRoute, HttpError, Result, RouteIO } from "@soapjs/soap";
import { Container } from "inversify";
import { StockController } from "../../features";

type SellProductModel = {
  id: string;
};

export class SellProductRouteIO
  implements RouteIO<string, unknown, Request, Response>
{
  fromRequest(request: Request<SellProductModel>): string {
    const {
      params: { id },
    } = request;

    if (!id) {
      throw new HttpError(400, 'Missing "id" in request');
    }

    return id;
  }

  toResponse(
    response: Response<SellProductModel[] | string>,
    result: Result
  ): void {
    if (result.isFailure) {
      response.status(500).send(result.failure.error.message);
    } else {
      response.status(200).send("OK");
    }
  }
}
export class SellProductRoute extends GetRoute {
  static create(container: Container) {
    const controller = container.get<StockController>(StockController.Token);
    const handler = controller.sellProduct.bind(controller);

    return new SellProductRoute("/products/:id/Sell", handler, {
      io: new SellProductRouteIO(),
    });
  }
}
