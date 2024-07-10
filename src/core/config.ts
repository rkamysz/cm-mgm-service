import * as Soap from "@soapjs/soap";
import { MongoConfig } from "@soapjs/soap-node-mongo";

export class Config implements Soap.Config {
  static create(envPath?: string) {
    const vars = new Soap.ConfigVars(envPath);
    const port = vars.getNumberEnv("HTTP_PORT");
    const mongo = MongoConfig.create(vars);

    return new Config(port, mongo);
  }

  constructor(
    public readonly port: number,
    public readonly mongo: MongoConfig
  ) {}
}
