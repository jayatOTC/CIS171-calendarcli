//https://github.com/rotaready/moment-range/blob/master/README.md
// Jay Allen
// program: calendarcli.js
// 3/28/19
// GITHUB REPOSITORY:  https://github.com/jayatOTC/CIS171-calendarcli
// 

//  const does not work had to use var
//
var chalk = require('chalk');
var moment = require('moment');
var MomentRange = require('moment-range');
var Moment = MomentRange.extendMoment(moment);

var lodash = require('lodash');
var log = console.log;

var dayOfWeek = moment().format('dddd');
var currentDate = moment();

// games to see how chalk can be used to get some of line colored while others are not

// var testing = " testing  ";
// testing += (chalk.redBright.underline(dayOfWeek));
// log("underlined DayOfWeek = " + testing);

// log(dayOfWeek);
var bar = "|";
var nowDate = moment();
var currentYear = moment().format("YYYY");  
// needed for printing month and determining leap year;
// log("current year = " + currentYear);


var startMonth = moment().format('MMMM');
var processingMonth = moment().month(); // month in numeric format
var startWeekDay = 0;
var firstDay = 0;
// log("\n\n processingMonth = " + processingMonth + "\n\n");
// log("Start month is: " + startMonth + " starting month is the next month");
var processedMonths = 0;  // count months processed we are doing 12

var endMonth = moment().add(12,'M').format('MMMM');
// log("end month is: " + endMonth);

// headings for days of the week

daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

var daysInMonth = 0;  // used to make array of days begins as zero function loads actual number

var dayOfMonth = moment().format('DD');
// log("day of month is: " + dayOfMonth);



function printBlankLines(){
//  Print 5 blank lines to separate months and begin with 5 blank lines to separate
//  calendar from computer generated crap before the calendar begins
    for (sub = 0; sub <= 5; sub++) {
    log( );
    }
}
function printUnderscores(){
    // format and print a line of underscores

    var underScore = bar;
    for (sub = 0; sub <= 89; sub++)
    {
        underScore += "-";
    }
    underScore += bar;
    log(underScore);
}   // end of function printUnderscores


function printFillerLine(){
    //  spacer line to go before and after day of month
    //  after holiday line
    //  and after birthday line 
    //  in the date fields of the calendar
    var fillerLine = bar;
    var spaces = "        ";
    for (sub = 0; sub <= 6; sub++) {
        fillerLine += lodash.pad(spaces, 12);
        fillerLine += bar;
    }
    log(fillerLine);
}   // end of function printFillerLine


// print heading of processing month
function printMonth(){
    // add one to month each time this is entered
    // the beginning month is the month after the current month
    processedMonths++;  
    printedMonth = moment().add(processedMonths, 'M').format('MMMM');
    currentDate = currentDate.add(1, 'Month');
    // log("current date = " + currentDate.format('YYYY-MM-DD'));

    
    //  printedMonth = "January";  used to check print of january  with year.
    
    var head1 = lodash.pad(printedMonth,90);
    log(bar + chalk.red(head1) + bar);
    // log(chalk.redBright.underline.bold(dayOfWeek));
}   // end of function printMonth

// print the year under the month
function printYear(){
    //  if we are printing january we must up the year by 1.
    if (printedMonth == "January") {
        currentYear ++;
    }
    
    var yearLine = lodash.pad(currentYear, 90);
    
    log(bar + chalk.redBright(yearLine) + bar);
}
    
// print days of week

function printDaysOfWeek(){
    var weekLine = "";
    for (sub = 0; sub <= 6; sub ++){
        weekLine += lodash.pad(daysOfWeek[sub], 12);
        weekLine += bar;
    }
    log(bar + weekLine);
}   // end of function printDaysOfWeek

//          get number of days in the month we are printing

function getDaysinMonth(){
    // set countOfDays to zero so we can see if it changes.
    var countOfDays = 0;
    //
    //  processedMonths is checked to determine how many days are in the current month
    //  30 or 31
     var checkMonth = moment(currentDate).startOf('month').format('M');

    if (checkMonth == 1 || checkMonth == 3 || checkMonth == 5 ||
        checkMonth == 7 || checkMonth == 8 || checkMonth == 10 ||
        checkMonth == 12)
        // all the rest have 31 except {see second else}
       {
           daysInMonth = 31;
       }
    else
    if (checkMonth == 4 || checkMonth == 6 || checkMonth == 9 ||
        checkMonth == 11)
        // 30 days hath September, April, June, and November
        daysInMonth = 30;
    else
    if (moment(currentDate).isLeapYear())
        // February  
    {
        daysInMonth = 29;   //  it is a leap year
    }
    else
    {   
        daysInMonth = 28;  //  not a leap year

    }   // end of if else stream

} // end of function getDaysinMonth


function arrayofDates() 
{
    //  Determine day of week for first day of month
    var startOfMonth = moment(currentDate).startOf('month').format('YYYY-MM-DD');
    var 
    // log ("start of Month = " + startOfMonth);
    firstDay = moment(startOfMonth).day();
    // log ("firstDay is: " + firstDay);


    // we already have the number of days in the month
    // first day is the day of the week the month starts on
    // dayfiller will be firstDay - 1 plus the DaysInMonth;
    var totalDays = (firstDay + daysInMonth);
    
    // log("Total days in month " + daysInMonth);
    var arrayOfDays = [];
    // print the set up and print the calendar dates under the correct days of the week.

    for (sub = 1; sub <= totalDays; sub++)
    {
        if (sub <= firstDay && firstDay > 0)
        {
            arrayOfDays.push("");
        }
        else
        {
            arrayOfDays.push (sub - firstDay);
        
        }  // end of inner if else
    }   // end of for
    
    //  chunk array into groups of seven
    var weeks = arrayOfDays.length / 7;
    var chunkedDays = lodash.chunk(arrayOfDays, 7);
    var dayString = bar;

    for (outerSub = 0; outerSub < weeks; outerSub ++)
    {
        for (innerSub = 0; innerSub < 7; innerSub ++)
        { 
            if (printedMonth == "March" && chunkedDays [outerSub] [innerSub] == 26)
            {
                dayString += chalk.whiteBright.bgRed(lodash.pad(chunkedDays [outerSub] [innerSub], 12));
                dayString += bar;
            } // my birthday
            else
            if (printedMonth == "November" && chunkedDays [outerSub] [innerSub] == 26)
            {
                    dayString += chalk.whiteBright.bgRed(lodash.pad(chunkedDays[outerSub][innerSub], 12));
                    dayString += bar;
            }
            else    // end of anniversary and yes both are on the 26th of the month
            {
                dayString += chalk.yellow(lodash.pad(chunkedDays[outerSub][innerSub], 12));
                dayString += bar;
            }   // end of if  else
        } // end of inner loop
        console.log(dayString);
        dayString = bar;
        
    } // end of outer loop
    printUnderscores();
}   // end of print month
   
// PROCEDURE DIVISION --  if we were doing COBOL

//  print 5 blank lines to separate output from the garbage generated by the system.
for (subscr = 0; subscr <= 11; subscr++){

    printBlankLines();
    printUnderscores();
    printMonth();
    printYear();
    printUnderscores();
    printDaysOfWeek();
    printUnderscores();
    printFillerLine();   // we want a blank line here for clarity on paper
    //
    // obtain the number of days in the month we are processing
    getDaysinMonth();
    // build an array by creating the enough elements to hold all the days in the month along
    // with the required blanks needed to place the first day of the month in the correct 
    // place.

    //     if the first day of the month is Thursday, the first four elements in the array should
    //     contain spaces. Then fifth elementy will contain the getDaysInMonth 1, consecutive numbers should
    //     fill the array.  if the final day of the month is a Tuesday, the final 3 elements will
    //     contain spaces.
    arrayofDates();

}   // end of mainline