import { useQuery } from "@tanstack/react-query";
import { getSumTotalTime } from "../../../utils/dateFns";
import { loginStore } from "../../../hooks/loginStore";
import { calendarStore } from "../../../hooks/calendarStore";
import { Overtime } from "./CalendarDay";
import dayjs from "../../../lib/day";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { get, ref } from "firebase/database";
import { db } from "../../../lib/firebase";

export default function HomeHeader() {
  const { setLogged } = loginStore();
  const { selectedMonth, selectedYear } = calendarStore();
  const key = `${selectedYear}-${selectedMonth}`;
  const { data } = useQuery<Record<number, Overtime>>([key], async () => {
    const overtimeRef = ref(db, `overtime-control/${key}`);
    const snapshot = await get(overtimeRef);
    return snapshot.toJSON() as Record<number, Overtime>;
  });
  const overtimes = data;
  const times =
    overtimes &&
    Object.values(overtimes)
      .map(({ totalTime }) => totalTime)
      .filter((totalTime) => totalTime);
  return (
    <div className="bg-red w-screen flex justify-between align-center  text-center bg-white p-0.5 md:p-3">
      <h1 className="w-1/3 text-slate-950 text-sm md:text-2xl text-center my-auto font-bold uppercase ">
        {dayjs.months()[selectedMonth]} - {selectedYear}
      </h1>
      <div className="w-1/3 flex justify-center flex-wrap md:flex-nowrap">
        <span className="text-sm md:text-lg mt-auto mr-2 w-full md:w-auto">
          Total Horas{" "}
        </span>
        <span className="font-bold text-xl md:text-4xl text-blue-500 w-full md:w-auto">
          {times && getSumTotalTime(times as string[])}
        </span>
      </div>
      <div className="w-1/3 flex justify-end pr-2 my-auto">
        <button
          className="text-right flex"
          onClick={() => {
            localStorage.setItem("signed", "");
            setLogged(false);
          }}
        >
          <RiLogoutBoxRFill className="text-3xl" />
          <span className="hidden md:flex text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
}
