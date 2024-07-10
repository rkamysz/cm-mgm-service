import { inject, injectable } from "inversify";
import * as Soap from "@soapjs/soap";
import { Order } from "../entities/order";
import { OrderRepository } from "../repositories/order.repository";

@injectable()
export class AddOrderUseCase implements Soap.UseCase<boolean> {
  static Token = "AddOrderUseCase";

  constructor(
    @inject(OrderRepository.Token) OrderRepository: OrderRepository
  ) {}

  async execute(order: Order): Promise<Soap.Result<boolean>> {
    throw new Error("Method not implemented.");
  }
}
