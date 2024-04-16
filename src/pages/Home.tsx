import React, { useEffect, useState } from "react";
import { getSymbolData } from "../services";
import { useModal } from "../components/use-modal";
import { ModalItem } from "./ModalItem";
import { Loader } from "rizzui";

const columns = [
  {
    key: "high",
    title: "High",
  },
  {
    key: "low",
    title: "Low",
  },
  {
    key: "changeRate",
    title: "Change Rate",
  },
  {
    key: "sell",
    title: "Sell",
  },
  {
    key: "buy",
    title: "Buy",
  },
  {
    key: "symbol",
    title: "Symbol",
  },
];

const symbols = [
  "BTC-USDT",
  "ETH-USDT",
  "XRP-USDT",
  "ADA-USDT",
  "BNB-USDT",
  "TRX-USDT",
  "LTC-USDT",
  "DOT-USDT",
  "AVAX-USDT",
  "TON-USDT",
];

export interface SymbolData {
  sell: string;
  buy: string;
  low: string;
  high: string;
  changeRate: string;
  symbol: string;
}

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [dataTable, setData] = useState<SymbolData[]>([]);
  const { openModal } = useModal();
  const fetchData = async () => {
    setLoading(true);
    const promises = symbols.map((item) => getSymbolData(item));
    await Promise.all(promises)
      .then((res) => {
        // console.log("RESULT: ", res);
        setData(
          res.map(({ data }) => ({
            buy: data.data.buy,
            low: data.data.low,
            sell: data.data.sell,
            high: data.data.high,
            changeRate: data.data.changeRate,
            symbol: data.data.symbol,
          }))
        );
      })
      .catch((err) => {
        console.log("ERROR: ", err.response);
      })
      .finally(() => {
        setLoading(false);
      });
    // console.log("GETDATA: ", countdown++);
    setTimeout(fetchData, 5000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItem = (item: SymbolData) => {
    openModal({
      view: <ModalItem item={item} />,
    });
  };
  return (
    <div>
      {loading && dataTable.length < 1 ? (
        <Loader />
      ) : (
        <table className="table-auto text-left min-w-[1000px] border-collapse ">
          <thead>
            <tr className="bg-gray-400">
              {columns.map((item, key) => (
                <th className="px-4 py-2" key={key}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item) => (
              <tr className="odd:bg-gray-100 even:bg-white" key={item.symbol}>
                {columns.map((column, key) => (
                  <td
                    className={`px-4 py-2 ${
                      column.key === "symbol" ? "cursor-pointer" : ""
                    }`}
                    key={key}
                    onClick={() => {
                      if (column.key === "symbol") {
                        handleItem(item);
                      }
                    }}
                  >
                    {item?.[column.key as keyof SymbolData] || "NODATA"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
