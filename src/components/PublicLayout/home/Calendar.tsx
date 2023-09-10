import CalendarHeader from "./CalendarHeader";
import { useQuery } from "@tanstack/react-query";
import dayjs, { buildCalendar } from "../../../lib/day";
import CalendarDay, { Overtime } from "./CalendarDay";
import { calendarStore } from "../../../hooks/calendarStore";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export default function Calendar() {
  const { selectedMonth, selectedYear, changeMonth } = calendarStore();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const dates = buildCalendar(selectedYear, selectedMonth);

  const key = `${selectedYear}-${selectedMonth}`;
  const { data, isLoading } = useQuery<Record<number, Overtime>>(
    [key],
    async () => {
      const overtimeRef = ref(db, `overtime-control/${key}`);
      const snapshot = await get(overtimeRef);
      return snapshot.toJSON() as Record<number, Overtime>;
    }
  );

  return (
    <div
      className={`w-screen h-screen ${
        !isLoading ? "bg-slate-300" : "bg-red-300"
      } flex flex-col `}
    >
      <div className="flex">
        <div className="fixed top-1/2 left-1 md:left-4 cursor-pointer">
          <div
            onClick={() => {
              changeMonth(true);
            }}
            className="text-3xl opacity-90 md:text-5xl font-bold text-rose-600 bg-white rounded-full  border-2 border-solid border-black "
          >
            <BiLeftArrowAlt />
          </div>
        </div>

        <div className="fixed top-1/2 right-1 md:right-5  cursor-pointer">
          <div
            onClick={() => {
              changeMonth(false);
            }}
            className="text-3xl opacity-90 md:text-5xl font-bold text-rose-600 bg-white rounded-full border-2 border-solid border-black "
          >
            <BiRightArrowAlt className="m-auto" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-11/12 h-[1/6 ] overflow-hidden md:h-[95%] bg-white m-auto border md:border-2 border-gray-800 border-solid flex flex-col">
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
