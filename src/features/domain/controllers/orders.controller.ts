import * as Soap from "@soapjs/soap";
import { injectable } from "inversify";
import { Order } from "../entities/order";

@injectable()
export class OrdersController {
  static Token = "OrdersController";

  addOrder(order: Order): Soap.Result {
    return null;
  }
}
