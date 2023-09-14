import CalendarHeader from "./CalendarHeader";
import { useQuery } from "@tanstack/react-query";
import dayjs, { buildCalendar } from "../../../lib/day";
import CalendarDay, { Overtime } from "./CalendarDay";
import { calendarStore } from "../../../hooks/calendarStore";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export default function Calendar() {
  const { selectedMonth, selectedYear, changeMonth } = calendarStore();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const dates = buildCalendar(selectedYear, selectedMonth);

  const key = `${selectedYear}-${selectedMonth}`;
  const { data, isLoading, isFetching } = useQuery<Record<number, Overtime>>([
    key,
  ]);

  return (
    <div
      className={`w-screen h-screen ${
        !isLoading || isFetching ? "bg-slate-300" : "bg-red-300"
      } flex flex-col `}
    >
      <div className="flex">
        <div className="fixed bottom-0 md:bottom-auto md:top-1/2 left-1 md:left-4 cursor-pointer">
          <div
            onClick={() => {
              changeMonth(true);
            }}
            className="text-6xl md:text-7xl opacity-80 md:opacity-90  font-bold text-rose-600 bg-white rounded-full  border-2 border-solid border-black "
          >
            <BiLeftArrowAlt />
          </div>
        </div>

        <div className="fixed bottom-0 md:bottom-auto md:top-1/2 right-1 md:right-5  cursor-pointer">
          <div
            onClick={() => {
              changeMonth(false);
            }}
            className="text-6xl md:text-7xl opacity-80 md:opacity-90  font-bold text-rose-600 bg-white rounded-full border-2 border-solid border-black "
          >
            <BiRightArrowAlt className="m-auto" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-11/12 h-[1/6] overflow-hidden md:h-[95%] bg-white m-auto border md:border-2 border-gray-800 border-solid flex flex-col">
        <div className="w-full flex ">
          {dayjs.weekdaysShort().map((day) => (
            <CalendarHeader key={day} weekday={day} />
          ))}
        </div>

        <div className="flex w-full flex-wrap grow h-[85vh]">
          {dates.map((day) => (
            <CalendarDay
              key={day.toString()}
              date={day}
              disabled={
                dayjs(day).isBefore(firstDayOfMonth, "month") ||
                dayjs(day).isAfter(firstDayOfMonth, "month")
              }
              overtime={
                data &&
                data[day.getDate()] &&
                dayjs(day).isSame(firstDayOfMonth, "month")
                  ? {
                      startDate: data[day.getDate()].startDate,
                      endDate: data[day.getDate()].endDate,
                      selectedDraft: data[day.getDate()].selectedDraft,
                      totalTime: data[day.getDate()].totalTime,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
