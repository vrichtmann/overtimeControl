import {describe, it, expect} from 'vitest';
import {buildCalendar} from './day';

describe("dayFns espec", () => {

    describe("check first date", () =>{
        it("test length of Calendar", ()=>{
            expect(buildCalendar(2023, 3).length).toEqual(42);
        })
        it("check first date", ()=>{
            //console.log("TESTE ", buildCalendar(new Date())[0].toISOString())
            expect(buildCalendar(2023, 3)[0].getDate()).toEqual(29);
        })
    })
})