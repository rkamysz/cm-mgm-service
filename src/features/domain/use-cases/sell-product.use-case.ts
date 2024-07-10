import { inject, injectable } from "inversify";
import * as Soap from "@soapjs/soap";

import { ProductRepository } from "../repositories/product.repository";

@injectable()
export class SellProductUseCase implements Soap.UseCase<boolean> {
  static Token = "SellProductUseCase";

  constructor(
    @inject(ProductRepository.Token) productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<Soap.Result<boolean>> {
    throw new Error("Method not implemented.");
  }
}
