import Joi from "joi";

type AddOrderProductModel = {
  id: string;
  count: number;
};

export type AddOrderModel = {
  customerId: string;
  products: AddOrderProductModel[];
};

export const AddOrderSchema = Joi.object<AddOrderModel>({
  customerId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  products: Joi.array()
    .items(
      Joi.object<AddOrderProductModel>({
        id: Joi.string().required(),
        count: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
      })
    )
    .required(),
});
