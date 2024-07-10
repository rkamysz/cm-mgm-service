import * as Soap from "@soapjs/soap";
import { injectable } from "inversify";
import { Product } from "../entities/product";

@injectable()
export class ProductsController {
  static Token = "ProductsController";

  addProduct(product: Product): Soap.Result {
    return null;
  }

  listProducts(): Soap.Result<Product[]> {
    return null;
  }
}
