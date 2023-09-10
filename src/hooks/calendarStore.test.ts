import { describe, it, expect} from "vitest";
import {changeMonth,CalendarStore} from "./calendarStore"

describe("Calendar Store spec", () =>{
    it("sum one Month if is before is false", () =>{
        const currentState = {selectedMonth:1, selectedYear: 2023}
        expect(changeMonth(false)(currentState as CalendarStore)).toEqual({selectedMonth:2, selectedYear: 2023})
    })

    it("subtract one Month if is before is true", () =>{
        const currentState = {selectedMonth:1, selectedYear: 2023}
        expect(changeMonth(true)(currentState as CalendarStore)).toEqual({selectedMonth:0, selectedYear: 2023})
    })

    it("subtract one Month and one year if is before is true and current month is 0", () =>{
        const currentState = {selectedMonth:0, selectedYear: 2023}
        expect(changeMonth(true)(currentState as CalendarStore)).toEqual({selectedMonth:11, selectedYear: 2022})
    })

    it("sum one Month and one year if is before is fase and current month is 11", () =>{
        const currentState = {selectedMonth:11, selectedYear: 2023}
        expect(changeMonth(false)(currentState as CalendarStore)).toEqual({selectedMonth:0, selectedYear: 2024})
    })
})
