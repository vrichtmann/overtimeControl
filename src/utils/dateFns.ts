
export function milisecondsToHours(miliseconds:number){
    const seconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(seconds / 60) ;
    const hours = Math.floor(minutes / 60) ;
    return `${padTo2Digits(hours % 60)}:${padTo2Digits(minutes% 60)}`
}

function padTo2Digits(num:number){
    return num.toString().padStart(2, "0");
}

export function getTotalTime(startTime:string, endTime:string){
    const initTimeArray = startTime.split(":")
    const endTimeArray = endTime.split(":")
    const intTimeMillisecounds = (parseInt(initTimeArray[0]) * 60 * 60 * 1000) + parseInt(initTimeArray[1]) * 60 * 1000;
    const endTimeMillisecounds = (parseInt(endTimeArray[0]) * 60 * 60 * 1000) + parseInt(endTimeArray[1]) * 60 * 1000;

    if(intTimeMillisecounds && endTimeMillisecounds && intTimeMillisecounds < endTimeMillisecounds){
        return milisecondsToHours(endTimeMillisecounds - intTimeMillisecounds)
    }

    return "";
}

function timeStringToMilisecound(time:string){
    const [hour, minute] = time.split(":")
    return (parseInt(hour) * 60 * 60 * 1000) + parseInt(minute) * 60 * 1000;
}

export function getSumTotalTime(times:string[]){
   const sumtime =  times.reduce((acc, cur) =>{
        return acc += timeStringToMilisecound(cur);
    }, 0)
    return milisecondsToHours(sumtime);
}