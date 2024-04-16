import { useEffect, useState } from "react";
import { SymbolData } from "./Home";
import { Button, ActionIcon, Text } from "rizzui";
import { useModal } from "../components/use-modal";
import { SymbolResponse, getSymbolData } from "../services";
import { PiXBold } from "react-icons/pi";
import { Loader } from "rizzui";

const RowItem = ({
  title,
  value,
}: {
  title: string;
  value?: string | number;
}) => {
  return (
    <div className="grid rounded odd:bg-gray-200 grid-cols-3 px-4 py-2 gap-x-2 w-full">
      <div>
        {title
          .toLowerCase()
          .replace(/(?<!\p{L})\p{L}(?=\p{L}{2})/gu, (m) => m.toUpperCase())}
        :{" "}
      </div>
      <div className="col-span-2">{value}</div>
    </div>
  );
};

let timer: any;

export const ModalItem = ({ item }: { item: SymbolData }) => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();

  const [data, setData] = useState<SymbolResponse["data"] | undefined>(
    undefined
  );
  const handleClose = () => {
    closeModal();
  };

  const fetchData = async () => {
    setLoading(true);
    await getSymbolData(item.symbol)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR: ", err.response);
      })
      .finally(() => {
        setLoading(false);
        timer = setTimeout(fetchData, 5000);
      });
  };

  useEffect(() => {
    fetchData();

    return () => {
      setData(undefined);
      setLoading(false);
      clearTimeout(timer);
    };
  }, [item.symbol]);
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Text className="font-semibold">
          Symbol {item.symbol.replace("-", " ")}
        </Text>
        <ActionIcon
          size="sm"
          variant="text"
          className="bg-transparent  active:bg-gray-400"
          onClick={handleClose}
        >
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="item-center flex w-full items-center min-h-28 justify-center flex-col">
        {loading && !data ? (
          <Loader variant="spinner" color="primary" />
        ) : (
          data &&
          Object.keys(data).map((key) => (
            <RowItem
              title={key}
              value={data[key as keyof SymbolResponse["data"]]}
            />
          ))
        )}
      </div>
      <div className="flex justify-end gap-3">
        <Button
          variant="text"
          onClick={handleClose}
          className="bg-gray-500 text-white active:bg-gray-400"
        >
          Close
        </Button>
      </div>
    </div>
  );
};
