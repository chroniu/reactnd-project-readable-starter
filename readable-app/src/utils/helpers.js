import uuidv1 from 'uuid/v1';

export const arrayToIndexedObject = (array, indexProperty) =>
    array.reduce((obj, item) =>    // eslint-disable-next-line
                 (obj[item[indexProperty]] = item, obj), {});


/**
   returns a sort helper function for some attribute
*/
export const  orderArrayBy = (attr) => 
    (order) =>
    (a, b) => {
        const signal = order ? 1 : -1;
        const val1 = a[attr]; 
        const val2 = b[attr];
        
        if (val1 > val2)
            return 1 * signal;
        else if (val1 < val2)
            return -1 * signal;
        else return 0;
    };


/**
   @description Timestamp to relative time string 
   from https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
*/
export const timeSince = (timeStamp) => {
    timeStamp = new Date(timeStamp);
    var now = new Date(),
        secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if(secondsPast < 60){
        return parseInt(secondsPast) + 's';
    }
    if(secondsPast < 3600){
        return parseInt(secondsPast/60) + 'm';
    }
    if(secondsPast <= 86400){
        return parseInt(secondsPast/3600) + 'h';
    }
    if(secondsPast > 86400){
        const day = timeStamp.getDate();
        const month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        const year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
        return day + " " + month + year;
    }
};


export const getUUID = () =>{
    return uuidv1(); 
};
