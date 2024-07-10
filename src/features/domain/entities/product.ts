import * as Soap from "@soapjs/soap";

type ProductJson = {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
};

export class Product implements Soap.Entity {
  private _id: string;
  constructor(
    id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number
  ) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  toJson(): ProductJson {
    const { _id: id, name, description, stock, price } = this;
    return { id, name, description, stock, price };
  }
}
