import { inject, injectable } from "inversify";
import * as Soap from "@soapjs/soap";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product.repository";

@injectable()
export class AddProductUseCase implements Soap.UseCase<boolean> {
  static Token = "AddProductUseCase";

  constructor(
    @inject(ProductRepository.Token) productRepository: ProductRepository
  ) {}

  async execute(product: Product): Promise<Soap.Result<boolean>> {
    throw new Error("Method not implemented.");
  }
}
