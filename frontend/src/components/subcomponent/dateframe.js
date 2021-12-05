
    export function date_frame(date)
    {
        //MONTH FRAME
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
      
        //
        var d = new Date(date);
        const year = d.getFullYear(); // year
        const newdate = d.getDate();//Date
        
        var n = month[d.getMonth()];

        return `${n} "${newdate}" ${year}`;
    }


    export function time_ago(date)
    {
        var d = new Date(date);
        const Hour = d.getHours(); // Hours
        const min = d.getMinutes();//Minu
        
        return `${Hour} : ${min}`;
    }

