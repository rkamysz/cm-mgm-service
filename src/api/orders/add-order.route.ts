import { Request, Response } from "express";
import { PostRoute, Result, RouteIO } from "@soapjs/soap";
import { Container } from "inversify";
import { Order } from "../../features/domain/entities/order";
import { AddOrderModel, AddOrderSchema } from "./orders.schemas";
import { OrdersController } from "../../features";

export class AddOrderRouteIO
  implements RouteIO<Order, AddOrderModel, Request, Response>
{
  toResponse(response: Response, result: Result<AddOrderModel>): void {
    if (result.isFailure) {
      response.status(500).send(result.failure.error.message);
    } else {
      response.status(200).send("Order added");
    }
  }

  fromRequest(request: Request<unknown, unknown, AddOrderModel>): Order {
    const {
      body: { customerId, products },
    } = request;

    const { error } = AddOrderSchema.validate(request.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    return new Order(null, customerId, products);
  }
}

export class AddOrderRoute extends PostRoute {
  static create(container: Container) {
    const controller = container.get<OrdersController>(OrdersController.Token);
    const handler = controller.addOrder.bind(controller);

    return new AddOrderRoute("/Orders", handler, {
      io: new AddOrderRouteIO(),
    });
  }
}
