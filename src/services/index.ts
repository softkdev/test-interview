import { axiosInstance } from "./axios";
import { AxiosResponse } from "axios";

export interface SymbolResponse {
  code: string; //"200000";
  data: {
    averagePrice: string; //"63035.42570307";
    buy: string; //"61838.8";
    changePrice: string; //"-2364.5";
    changeRate: string; //"-0.0368";
    high: string; //"64729.9";
    last: string; //"61837.3";
    low: string; //"61592.1";
    makerCoefficient: string; //"1";
    makerFeeRate: string; //"0.001";
    sell: string; //"61838.9";
    symbol: string; //"BTC-USDT";
    takerCoefficient: string; //"1";
    takerFeeRate: string; //"0.001";
    time: number; //1713284792007;
    vol: string; //"4991.55297704";
    volValue: string; //"314359358.401474304";
  };
}

export const getSymbolData = (symbol: string) => {
  return axiosInstance.get<unknown, AxiosResponse<SymbolResponse>>(
    `api/v1/market/stats?symbol=${symbol}`
  );
};
