import * as MongoDB from "mongodb";
import { EntityField } from "@soapjs/soap";

export class ProductMongoModel {
  @EntityField("id")
  public readonly _id: MongoDB.ObjectId;

  @EntityField("name")
  public readonly name: string;

  @EntityField("description")
  public readonly description: string;

  @EntityField("price")
  public readonly price: number;

  @EntityField("stock")
  public readonly stock: number;
}
