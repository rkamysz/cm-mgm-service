import { inject, injectable } from "inversify";
import * as Soap from "@soapjs/soap";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product.repository";

@injectable()
export class ListProductsUseCase implements Soap.UseCase<Product[]> {
  static Token = "ListProductsUseCase";

  constructor(
    @inject(ProductRepository.Token) productRepository: ProductRepository
  ) {}

  async execute(): Promise<Soap.Result<Product[]>> {
    throw new Error("Method not implemented.");
  }
}
