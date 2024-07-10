import Joi from "joi";
import { PriceUtils } from "../../core/price.utils";

export type AddProductModel = {
  name: string;
  description: string;
  price: string;
  stock: number;
};

export const AddProductSchema = Joi.object<AddProductModel>({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(50).required(),
  price: Joi.alternatives()
    .try(
      Joi.number().greater(0),
      Joi.string()
        .pattern(/^\d+(\.\d{1,2})?\s?\w+$/i)
        .custom((value, helpers) => {
          const numericValue = PriceUtils.convertPriceToNumber(value);
          if (numericValue <= 0) {
            return helpers.error("any.invalid");
          }
          return value;
        })
    )
    .required(),
  stock: Joi.number().integer().required(),
});
