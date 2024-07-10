import * as Soap from "@soapjs/soap";
import { Product } from "../entities/product";

export abstract class ProductRepository extends Soap.Repository<Product> {
  static Token = "ProductRepository";
}
