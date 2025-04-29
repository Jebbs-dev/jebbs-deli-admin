import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import useAuthStore from "@/state-store/auth";
import { useQueryParamaters } from "@/state-store/use-query-params";
import { useEffect, useState } from "react";

import { formatDate } from "@/utils/format-date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

interface TableFilterProps {
  title: string;
  buttonTitle?: string;
  formLink?: string;
  canAddNew: boolean;
}

const TableFilters = ({
  title,
  buttonTitle,
  formLink,
  canAddNew,
}: TableFilterProps) => {

  const { dateFilter, setDateFilter, selectedFilter, setSelectedFilter, date, setDate, dateRange, setDateRange } = useQueryParamaters();
  // const [date, setDate] = useState<Date>();
  // const [dateRange, setDateRange] = useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: addDays(new Date(), 20),
  // });

  const router = useRouter();

  const handleFilterChange = async (value: string) => {
    setSelectedFilter(value);

    const now = new Date();

    let startDate: string;
    let endDate = formatDate(now).toString(); // Today's date

    // Map the selected filter to date ranges
    switch (value) {
      case "today":
        startDate = formatDate(
          new Date(now.getFullYear(), now.getMonth(), now.getDate())
        ).toString();

        break;
      case "last_24_hours":
        startDate = formatDate(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        ).toString();

        break;
      case "this_week":
        startDate = formatDate(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        ).toString();

        break;
      case "this_month":
        startDate = formatDate(
          new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        ).toString();
        break;
      case "this_year":
        startDate = formatDate(
          new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        ).toString();
        break;
      default:
        startDate = "";
    }

    // If the value is "custom", don't make the API call here
    if (value === "custom") return;

    if (value === "single") return;

    dateFilter.startDate = startDate;
    dateFilter.endDate = endDate;

    setDateFilter(dateFilter);
  };

  return (
    <div className="flex flex-col xl:flex-row justify-between xl:items-center">
      <h1 className="text-xl font-semibold mb-2 xl:mb-0">{title}</h1>
      <div className="flex flex-row space-x-3">
        <div className="flex xl:flex-row flex-col gap-2 xl:gap-0 w-full xl:w-auto">
          <div className="flex flex-row gap-2 mr-2 w-full xl:w-auto">
            <Select
              onValueChange={(value) => {
                handleFilterChange(value);
              }}
              defaultValue=""
              value={selectedFilter}
            >
              <SelectTrigger className="w-auto xl:w-[180px] flex-grow">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last_24_hours">Last 24 hours</SelectItem>
                <SelectItem value="this_week">This week</SelectItem>
                <SelectItem value="this_month">This month</SelectItem>
                <SelectItem value="this_year">This year</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="single">Single</SelectItem>
              </SelectContent>
            </Select>

            {selectedFilter !== "" && (
              <Button
                size="icon"
                onClick={() => {
                  dateFilter.startDate = "";
                  dateFilter.endDate = "";
                  setDateFilter(dateFilter);
                  setSelectedFilter("");
                  setDate(undefined);
                }}
              >
                <Trash2 size={18} />
              </Button>
            )}

            {canAddNew && (
              <Button
                onClick={() => router.push("/products/new")}
                className="lg:hidden block"
              >
                <span className="">
                  <Plus size={20} />
                </span>
              </Button>
            )}
          </div>

          {selectedFilter === "single" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "xl:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    const selectedDate = new Date(
                      date!.getFullYear(),
                      date!.getMonth(),
                      date!.getDate()
                    );
                    dateFilter.startDate = formatDate(selectedDate).toString();
                    // dateFilter.endDate = formatDate(selectedDate).toString();
                    setDateFilter(dateFilter);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}

          {selectedFilter === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "xl:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="range"
                  numberOfMonths={2}
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(dateRange) => {
                    setDateRange(dateRange);

                    console.log(dateRange);
                    const selectedFrom = new Date(
                      dateRange!.from!.getFullYear(),
                      dateRange!.from!.getMonth(),
                      dateRange!.from!.getDate()
                    );
                    const selectedTo = new Date(
                      dateRange!.to!.getFullYear(),
                      dateRange!.to!.getMonth(),
                      dateRange!.to!.getDate()
                    );
                    dateFilter.startDate = formatDate(selectedFrom).toString();
                    dateFilter.endDate = formatDate(selectedTo).toString();
                    // setDateFilter(dateFilter);
                  }}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>

        {canAddNew && (
          <Button
            onClick={() => router.push(`${formLink}`)}
            className="hidden lg:flex"
          >
            <span className="lg:mr-2">
              <Plus size={20} />
            </span>
            <p className="md:hidden lg:block">{buttonTitle}</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TableFilters;
