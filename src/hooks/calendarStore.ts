
import {create} from "zustand";
import dayjs from "../lib/day";
import { Overtime } from "../components/PublicLayout/home/CalendarDay";

type OvertimeData = Overtime&{day:number}

export type CalendarStore = {
    selectedMonth: number
    selectedYear: number
    calendarPopupIsOpen: boolean
    selectedStartTime: string
    selectedEndTime: string
    selectedDraft: string
    selectedDay:number
    totalTime: string

    setSelectedMonth: (month:number) => void
    setSelectedYear: (year:number) => void
    changeMonth: (isBefore:boolean) => void
    setCalendarPopupIsOpen: (isOpen:boolean, overtimeData?:OvertimeData) => void
    setStartTime: (startTime:string) => void
    setEndTime: (endTime:string) => void
    setSelectedDraft: (draft:string) => void
    singleChange: (key: keyof CalendarStore, value: unknown) => void
    clearPopup: (clearPop: void) => void
}

export const calendarStore = create<CalendarStore>(
    (set) => ({
        selectedMonth: dayjs().month(),
        selectedYear: dayjs().year(),
        calendarPopupIsOpen: false,
        selectedTodayInfo: new Date(),
        selectedStartTime: "",
        selectedEndTime: "",
        selectedDraft: "",  
        totalTime: "",
        selectedDay: 0,
        

        setSelectedMonth: (month:number) => set(() => ({selectedMonth:month})),
        setSelectedYear: (year:number) => set(() => ({selectedYear:year})),
        changeMonth: (isBefore:boolean) => set(changeMonth(isBefore)),
        setCalendarPopupIsOpen: (isOpen:boolean, overtimeData?:OvertimeData) => set(() =>({calendarPopupIsOpen:isOpen, ...(!isOpen?clearPopHandle():mapOvertimeData(overtimeData))})),
        setStartTime: (startTime:string) => set(() => ({selectedStartTime:startTime})),
        setEndTime: (endTime:string) => set(() => ({selectedEndTime:endTime})),
        setSelectedDraft: (draft:string) => set(() => ({selectedDraft:draft})),
        singleChange: (key: keyof CalendarStore, value: unknown) => set((state) => ({...state, [key]: value})),
        clearPopup: () => set(clearPopHandle)
    })
);

export const changeMonth = (isBefore:boolean) => (state:CalendarStore) => {
    let newMonth = (isBefore ? state.selectedMonth - 1 : state.selectedMonth + 1);
    let newYear = state.selectedYear;

    if(state.selectedMonth === 0 && isBefore){
        newMonth = 11;
        newYear--;
    }
    else if(state.selectedMonth === 11 && !isBefore){
        newMonth = 0;
        newYear++;
    }
    return ({selectedMonth:newMonth, selectedYear:newYear})
}

const clearPopHandle = () =>(
    {
        selectedStartTime:  "",
        selectedEndTime: "",
        selectedDraft: "",
        totalTime: ""
    }
)

const mapOvertimeData = (data?:OvertimeData):Partial<CalendarStore> =>({
    selectedStartTime:  data?.startDate ?? "",
    selectedEndTime: data?.endDate ?? "",
    selectedDraft: data?.selectedDraft ?? "",
    totalTime: data?.totalTime ?? "",
    selectedDay: data?.day ?? 0
})