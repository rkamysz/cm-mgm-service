import * as MongoDB from "mongodb";
import { EntityField } from "@soapjs/soap";

type OrderedProductModel = {
  id: string;
  count: number;
};

export class OrderMongoModel {
  @EntityField("id")
  public readonly _id: MongoDB.ObjectId;

  @EntityField("customerId")
  public readonly customer_id: string;

  @EntityField("products")
  public readonly products: OrderedProductModel[];
}
