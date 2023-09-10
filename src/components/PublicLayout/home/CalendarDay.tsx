import { useState } from "react";
import dayjs from "../../../lib/day";
import { FaEdit, FaPlus } from "react-icons/fa";
import { calendarStore } from "../../../hooks/calendarStore";

type CalendarDayProps = {
  disabled?: boolean;
  date: Date;
  overtime?: Overtime;
};

export type Overtime = {
  id?: string;
  startDate?: string;
  endDate?: string;
  totalTime?: string;
  selectedDraft?: string;
};

export default function CalendarDay({
  disabled,
  date,
  overtime,
}: CalendarDayProps) {
  const isToday = dayjs(date).isSame(new Date(), "day");

  const [inputtedTime] = useState<boolean>(true);
  const { setCalendarPopupIsOpen, changeMonth, selectedMonth, selectedYear } =
    calendarStore();

  const openCalendarPopup = () => {
    setCalendarPopupIsOpen(true, {
      day: date.getDate(),
      startDate: overtime?.startDate,
      endDate: overtime?.endDate,
      totalTime: overtime?.totalTime,
      selectedDraft: overtime?.selectedDraft,
    });
  };

  const changeMonthHandler = () => {
    changeMonth(
      dayjs(date).isBefore(new Date(selectedYear, selectedMonth, 1), "month")
    );
  };

  return (
    <div
      onClick={!disabled ? openCalendarPopup : changeMonthHandler}
      className={`w-1/7 h-[16.66%] overflow-hidden cursor-pointer border ${
        !disabled ? "bg-white" : "bg-slate-100"
      }  ${
        isToday
          ? "bg-purple-100 md:bg-white border-1 md:border-4 border-black md:border-cyan-500"
          : "md:border-2 border-black"
      } border-solid flex p-1 md:px-2 flex-col`}
    >
      <div className="flex flex-col md:flex-row glow ">
        <h1
          className={`text-sm text-center md:text-2xl grow font-bold capitalize mb-1 ${
            disabled ? "text-gray-400" : ""
          }`}
        >
          {dayjs(date).format("DD MMM")}
        </h1>
        {!inputtedTime ? (
          <button
            onClick={openCalendarPopup}
            className="hidden md:flex w-5 h-5 top-0 bg-green-600 text-xs my-auto font-bold rounded-lg text-white"
          >
            <FaPlus className="m-auto" />
          </button>
        ) : (
          <button
            onClick={openCalendarPopup}
            className="hidden md:flex w-5 h-5 top-0 bg-sky-500 text-xs my-auto font-bold rounded-lg text-white"
          >
            <FaEdit className="m-auto" />
          </button>
        )}
      </div>
      <div className="flex grow ">
        <div
          className={`flex flex-col w-full 
          rounded-md text-white`}
        >
          {overtime && (
            <div id={overtime.id} className="flex w-full">
              <h1
                className={`flex-col text-center  md:flex justify-center text-sm md:text-base ml-1 grow ${
                  !disabled ? "text-zinc-950" : "text-zinc-500"
                } md:font-bold `}
              >
                {overtime.startDate &&
                  overtime.endDate &&
                  `${overtime?.startDate} - ${overtime?.endDate}`}
              </h1>
            </div>
          )}
          {overtime &&
            overtime?.selectedDraft &&
            overtime?.selectedDraft?.length > 0 && (
              <p
                className={`hidden md:flex h-9 overflow-y-scroll ${
                  !disabled ? "text-gray-950" : "text-zinc-500"
                }  px-2 bg-local`}
              >
                {overtime?.selectedDraft}
              </p>
            )}
        </div>
      </div>
      <div className="flex justify-end ">
        <h1
          className={`hidden md:flex text-xs my-auto mr-3 font-bold ${
            !disabled ? "text-gray-900" : "text-gray-500"
          } `}
        >
          Total :
        </h1>
        <span
          className={`text-xs md:text-base mt-2 md:mt-0 font-bold ${
            !disabled ? "text-blue-500" : "text-blue-300"
          } `}
        >
          {" "}
          {overtime?.totalTime}
        </span>
      </div>
    </div>
  );
}
