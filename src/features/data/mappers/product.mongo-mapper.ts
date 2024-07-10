import * as MongoDB from "mongodb";
import * as Soap from "@soapjs/soap";
import { Product } from "../../domain/entities/product";
import { ProductMongoModel } from "../dto/product.dto";

export class ProductMongoMapper
  implements Soap.Mapper<Product, ProductMongoModel>
{
  toEntity(model: ProductMongoModel): Product {
    return new Product(
      model._id.toString(),
      model.name,
      model.description,
      model.price,
      model.stock
    );
  }
  fromEntity(entity: Product): ProductMongoModel {
    const { name, description, stock, price, id } = entity;
    return {
      _id: new MongoDB.ObjectId(id),
      name,
      description,
      stock,
      price,
    };
  }
}
