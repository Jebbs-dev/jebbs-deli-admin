import Image from "next/image";
import { summaryData } from "./data/summary";

const SummaryData = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mx-auto md:mx-0 md:grid-cols-4 md:gap-4 md:w-full">
        {summaryData.map((data) => (
          <div
            className="flex md:w-full flex-col space-y-2 bg-white shadow-sm p-3 rounded-md"
            key={data.item}
          >
            <div className="flex flex-row space-x-4 justify-between items-center ]">
              <p className="text-xs font-normal text-muted-foreground">
                Total {data.item}
              </p>
              <div
                className={`flex space-x-1 items-center border px-1  bg-opacity-20 rounded-sm ${
                  data.color === "green" ? "bg-[#33b63a]" : "bg-[#ff3a28]"
                }`}
              >
                <p
                  className={`text-[8px] font-light ${
                    data.color === "green" ? "text-[#33b63a]" : "text-[#ff3a28]"
                  } `}
                >
                  {" "}
                  <span>{data.symbol}</span>
                  {data.percentage}%
                </p>
                {/*  */}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{data.total}</p>
              <Image
                src={data.chartLine}
                alt="chartline"
                className="w-12 h-3"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SummaryData;
