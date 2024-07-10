import * as Soap from "@soapjs/soap";

type OrderedProduct = {
  id: string;
  count: number;
};

type OrderJson = {
  id: string;
  customerId: string;
  products: OrderedProduct[];
};

export class Order implements Soap.Entity {
  private _id: string;
  constructor(
    id: string,
    public readonly customerId: string,
    public readonly products: OrderedProduct[]
  ) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  toJson(): OrderJson {
    const { _id: id, customerId, products } = this;
    return { id, customerId, products };
  }
}
