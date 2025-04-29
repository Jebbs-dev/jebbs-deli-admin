import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface QueryParamsProps {
  querykey: string;
  setQueryKey: (query: string) => void;
  backendPagination: {
    limit: number;
    offset: number;
  };
  setBackendPagination: (paging: { limit: number; offset: number }) => void;
  dateFilter: {
    startDate: string;
    endDate: string;
  };
  setDateFilter: (dates: { startDate: string; endDate: string }) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  date?: Date;
  setDate: (date?: Date) => void;
  dateRange?: DateRange;
  setDateRange: (range?: DateRange) => void;
}

export const useQueryParamaters = create<QueryParamsProps>((set) => ({
  querykey: "",
  backendPagination: {
    limit: 10,
    offset: 0,
  },
  dateFilter: {
    startDate: "",
    endDate: "",
  },
  date: undefined,
  dateRange: {
    from: new Date(),
    to: addDays(new Date(), 20),
  },
  selectedFilter: "",
  setQueryKey: (query) => set({ querykey: query }),
  setBackendPagination: (paging) => set({ backendPagination: paging }),
  setDateFilter: (dates) => set({ dateFilter: dates }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),

  setDate: (date) => set({ date }),
  setDateRange: (range) => set({ dateRange: range }),
}));
