import * as MongoDB from "mongodb";
import * as Soap from "@soapjs/soap";
import { Order } from "../../domain/entities/order";
import { OrderMongoModel } from "../dto/order.dto";

export class OrderMongoMapper implements Soap.Mapper<Order, OrderMongoModel> {
  toEntity(model: OrderMongoModel): Order {
    return new Order(model._id.toString(), model.customer_id, model.products);
  }
  fromEntity(entity: Order): OrderMongoModel {
    const { customerId: customer_id, products, id } = entity;
    return {
      _id: new MongoDB.ObjectId(id),
      customer_id,
      products,
    };
  }
}
