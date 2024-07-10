import "reflect-metadata";

import { Container } from "inversify";
import { Response } from "express";
import { SoapExpress } from "@soapjs/soap-express";

import { Dependencies, Config, Router } from "./core";
import { HttpError } from "@soapjs/soap";

export const bootstrap = async () => {
  const config = Config.create("../.env");
  const container = new Container();
  const dependencies = new Dependencies(container, config);
  const router = new Router(container, "api", "1");

  await SoapExpress.bootstrap(config, dependencies, router, {
    errorHandler: (err: Error) => {
      console.log(err);
    },
    httpErrorHandler: (err: HttpError, req, res: Response, next) => {
      console.log(err);
      res.status(err.status || 500).send(err.message);
    },
  });
};

bootstrap();
