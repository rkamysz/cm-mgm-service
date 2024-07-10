import * as Soap from "@soapjs/soap";
import { Order } from "../entities/order";

export abstract class OrderRepository extends Soap.Repository<Order> {
  static Token = "OrderRepository";
}
