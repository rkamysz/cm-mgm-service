import * as Soap from "@soapjs/soap";
import { injectable } from "inversify";
import { Product } from "../entities/product";

@injectable()
export class StockController {
  static Token = "StockController";

  restockProduct(product: Product): Soap.Result {
    return null;
  }

  sellProduct(): Soap.Result {
    return null;
  }
}
