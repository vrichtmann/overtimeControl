import {describe, it, expect} from "vitest"  
import {milisecondsToHours, getTotalTime, getSumTotalTime} from "./dateFns"

describe("dateFns spec", () =>{
    it("infra is working" , () =>{
        expect(true).toBeTruthy()
    })
    describe("milisecondsToHours spec", () =>{
        it("Convert a milisseconds to formated h:mm" , () =>{
            expect(milisecondsToHours(18000000)).toEqual("05:00");
        })
        it("Convert a milisseconds to formated h:mm float number" , () =>{
            expect(milisecondsToHours(16800000)).toEqual("04:40");
        })
        it("Convert a milisseconds to formated h:mm large hours" , () =>{
            expect(milisecondsToHours(90000000)).toEqual("25:00");
        })
    })

    describe("getTotalTime spec" , () =>{
        it("Get elapsed time from 2 times" , () =>{
            expect(getTotalTime("04:00", "04:05")).toEqual("00:05")
        })

        it("Get elapsed time diff time hours" , () =>{
            expect(getTotalTime("04:00", "06:45")).toEqual("02:45")
        })

        it("Get elapsed time invalidTime" , () =>{
            expect(getTotalTime("04:asds", "06:45")).toEqual("")
        })

        it("Get elapsed time negativeTime" , () =>{
            expect(getTotalTime("06:45", "04:45")).toEqual("")
        })

    })

    describe("GetSumTotalTime spec", ()=>{
        it("sums one array of time strings", ()=>{
            expect(getSumTotalTime(["00:30", "00:02"])).toEqual("00:32");
        })

        it("sums one array of time strings", ()=>{
            expect(getSumTotalTime(["00:30", "02:02", "01:30", "02:30"])).toEqual("06:32");
        })
    })
    
})
