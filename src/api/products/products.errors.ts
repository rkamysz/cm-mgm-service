import * as Soap from '@soapjs/soap';
export class BadPrice extends Soap.HttpError {
  constructor() {
    super(400, 'Invalid price');
  }
}