import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import { ref, set, remove } from "firebase/database";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { calendarStore } from "../../../hooks/calendarStore";
import { db } from "../../../lib/firebase";
import { getTotalTime } from "../../../utils/dateFns";

export default function CalendarEditPopup() {
  const {
    calendarPopupIsOpen,
    setCalendarPopupIsOpen,
    setStartTime,
    setEndTime,
    singleChange,
    selectedStartTime,
    selectedEndTime,
    selectedDraft,
    selectedMonth,
    selectedYear,
    selectedDay,
    totalTime,
  } = calendarStore();
  const client = useQueryClient();
  const key = [`${selectedYear}-${selectedMonth}`];

  const saveData = async () => {
    await set(
      ref(
        db,
        `overtime-control/${selectedYear}-${selectedMonth}/${selectedDay}`
      ),
      {
        startDate: selectedStartTime,
        endDate: selectedEndTime,
        selectedDraft,
        totalTime,
      }
    );
    client.invalidateQueries(key);
    setCalendarPopupIsOpen(!calendarPopupIsOpen);
  };

  const deleteData = async () => {
    await remove(
      ref(
        db,
        `overtime-control/${selectedYear}-${selectedMonth}/${selectedDay}`
      )
    );
    client.invalidateQueries(key);
    setCalendarPopupIsOpen(!calendarPopupIsOpen);
  };

  const { isLoading, mutate } = useMutation(saveData);
  const { isLoading: isDeleting, mutate: deleteDay } = useMutation(deleteData);

  const currentDate = new Date(selectedYear, selectedMonth, selectedDay);

  return ReactDOM.createPortal(
    <div>
      {calendarPopupIsOpen && (
        <div className="fixed z-10 text-center w-screen h-screen">
          <div
            className="absolute w-screen h-screen bg-slate-950 opacity-60"
            onClick={() => setCalendarPopupIsOpen(!calendarPopupIsOpen)}
          ></div>
          <div className="absolute overflow-y-scroll md:overflow-hidden flex flex-col shadow-xl top-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 w-full h-full md:h-auto md:w-6/12 bg-white border-0 md:border-2 border-solid border-black rounded-none md:rounded-md">
            <div className="flex justify-between text-center align-middle glow border-b-2 border-solid border-b-gray-500">
              <div className="flex w-full md:text-left flex-col md:flex-row  text-black capitalize font-bold p-4 md:p-2 glow ml-2 text-2xl md:text-2xl">
                {selectedDay.toString().padStart(2, "0")} -{" "}
                {dayjs(currentDate).format("MMMM")}
                <span className="font-semibold ml-3">
                  {dayjs(currentDate).format("dddd")}
                </span>
              </div>
              <div className="mt-4 md:my-auto mr-3">
                <button
                  onClick={() => {
                    setCalendarPopupIsOpen(!calendarPopupIsOpen);
                  }}
                  className=" text-black font-bold text-3xl"
                >
                  <MdClose />
                </button>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col md:flex-row justify-center gap-5 p-4 mt-2">
                <div className="flex flex-col md:flex-row">
                  <h1 className="text-blue-500 font-bold text-2xl m-auto">
                    Hora Inicial
                  </h1>
                  <input
                    className="border-2 border-solid border-black rounded-md md:ml-4 mt-2 md:mt-0 font-bold p-2 text-center"
                    type="time"
                    value={selectedStartTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      const totalTime = getTotalTime(
                        e.target.value,
                        selectedEndTime
                      );
                      if (totalTime) {
                        singleChange("totalTime", totalTime);
                      }
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row">
                  <h1 className="text-red-500 font-bold text-2xl m-auto">
                    Hora Final
                  </h1>
                  <input
                    className="border-2 border-solid border-black rounded-md md:ml-4 mt-2 md:mt-0 font-bold p-2 text-center"
                    type="time"
                    value={selectedEndTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                      const totalTime = getTotalTime(
                        selectedStartTime,
                        e.target.value
                      );
                      if (totalTime) {
                        singleChange("totalTime", totalTime);
                      }
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row">
                  <h1 className="text-green-600 font-bold text-2xl m-auto">
                    Total Horas
                  </h1>
                  <input
                    className="border-2 border-solid border-black rounded-md md:ml-4 mt-2 md:mt-0 font-bold p-2 text-center"
                    type="time"
                    value={totalTime}
                    onChange={(e) => {
                      singleChange("totalTime", e.target.value);
                      setEndTime("");
                      setStartTime("");
                    }}
                    required
                  />
                </div>
              </div>

              <div className="p-4">
                <h1 className="text-left text-xs text-gray-500 mb-1">
                  {" "}
                  Observação :{" "}
                </h1>
                <textarea
                  value={selectedDraft}
                  onChange={(e) => {
                    singleChange("selectedDraft", e.target.value);
                  }}
                  className="w-full h-32 border-2 border-solid border-gray-200 rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex justify-between p-5">
              <button
                onClick={() => deleteDay()}
                disabled={isLoading || isDeleting}
                className="bg-rose-600 disabled:bg-rose-100 p-4 border-2 border-solid border-stone-800 rounded-lg text-white text-base font-bold"
              >
                Apagar
              </button>
              <button
                disabled={isLoading || isDeleting}
                onClick={() => mutate()}
                className="bg-sky-500 disabled:bg-sky-200 p-4 border-2 border-solid border-stone-800 rounded-lg text-white text-base font-bold"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("popup-placeholders") as Element
  );
}
