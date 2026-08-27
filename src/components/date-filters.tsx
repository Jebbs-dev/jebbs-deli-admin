import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { useQueryParamaters } from "@/state-store/use-query-params";

import { formatDate } from "@/utils/format-date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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

  const { setDateFilter, selectedFilter, setSelectedFilter, date, setDate, dateRange, setDateRange } = useQueryParamaters();

  const navigate = useNavigate();

  const handleFilterChange = async (value: string) => {
    setSelectedFilter(value);

    const now = new Date();
    const today = formatDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    ).toString();
    const endDate = today;

    let startDate = "";

    switch (value) {
      case "today":
        startDate = today;
        break;
      case "last_24_hours":
        startDate = formatDate(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        ).toString();
        break;
      case "this_week": {
        const mondayOffset = (now.getDay() + 6) % 7;
        startDate = formatDate(
          new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - mondayOffset
          )
        ).toString();
        break;
      }
      case "this_month":
        startDate = formatDate(
          new Date(now.getFullYear(), now.getMonth(), 1)
        ).toString();
        break;
      case "this_year":
        startDate = formatDate(new Date(now.getFullYear(), 0, 1)).toString();
        break;
      default:
        startDate = "";
    }

    if (value === "custom" || value === "single") return;

    setDateFilter({ startDate, endDate });
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
                  setDateFilter({ startDate: "", endDate: "" });
                  setSelectedFilter("");
                  setDate(undefined);
                }}
              >
                <Trash2 size={18} />
              </Button>
            )}

            {canAddNew && (
              <Button
                onClick={() => navigate({ to: "/products" })}
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
                    if (!date) return;
                    const selectedDate = new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    );
                    setDateFilter({
                      startDate: formatDate(selectedDate).toString(),
                      endDate: formatDate(selectedDate).toString(),
                    });
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
                  onSelect={(nextRange) => {
                    setDateRange(nextRange);
                    if (!nextRange?.from || !nextRange.to) return;
                    const selectedFrom = new Date(
                      nextRange.from.getFullYear(),
                      nextRange.from.getMonth(),
                      nextRange.from.getDate()
                    );
                    const selectedTo = new Date(
                      nextRange.to.getFullYear(),
                      nextRange.to.getMonth(),
                      nextRange.to.getDate()
                    );
                    setDateFilter({
                      startDate: formatDate(selectedFrom).toString(),
                      endDate: formatDate(selectedTo).toString(),
                    });
                  }}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>

        {canAddNew && (
          <Button
            onClick={() => navigate({ to: `${formLink}` })}
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
