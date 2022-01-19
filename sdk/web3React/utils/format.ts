import { BigNumber } from "bignumber.js";

export function format(
  val: string | number,
  decimalPlaces: number = 0,
  roundingMode: BigNumber.RoundingMode = 1
) {
  return new BigNumber(val).toFormat(decimalPlaces, roundingMode);
}
