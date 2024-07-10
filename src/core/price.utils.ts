export class PriceUtils {
  static convertPriceToNumber(price: string) {
    if (!price) {
      return 0;
    }

    return parseFloat(price.replace(/[^\d.]/g, ""));
  }

  static convertNumberToPrice(price: number, currency = "pln") {
    if (!price) {
      return `0 ${currency}`;
    }
    return `${price.toFixed(2)} ${currency}`;
  }
}
