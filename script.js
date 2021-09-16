
const datePicker = document.querySelector("#datePicker");
const clickButton = document.querySelector("#btn");
const para = document.querySelector("#para");

clickButton.addEventListener("click", clickHandler);

function clickHandler() {
    var date = datePicker.valueAsDate;
    if(date === null){
        para.textContent = "Enter Some Value."
    }
    console.log(date)
    var day = date.getDate();
    var month = date.getMonth() + 1;//because it is 0-indexed
    var year = date.getFullYear();
    var dateString = getDateString(day, month, year);
    var dateList = getAllVariations(dateString);
    if(checkDateListForPalindrome(dateList)){
        para.textContent = "Your birthday is Palindrome!"
    }else{
        var temp = getNextPalindrome(date);
        var str = "Your b'day is not Palindrome. Upcoming Palindromic date is : "
        str = str + temp.getDate() + "/" +(temp.getMonth()+1).toString() + "/" + temp.getFullYear();
        para.textContent = str;
    }

}
function getNextPalindrome(date) {
    var flag = true;
    var temp = date;
    var counter = 0;
    while (flag) {
        temp = date.addDays(counter);
        counter = counter + 1;
        var day = temp.getDate();
        var month = temp.getMonth() + 1;//because it is 0-indexed
        var year = temp.getFullYear();
        var dateString = getDateString(day, month, year);
        var dateList = getAllVariations(dateString);
        var isPalindrome = checkDateListForPalindrome(dateList);
        if(isPalindrome){
            return temp;
            flag = false;
        }
    }
}
function checkDateListForPalindrome(list) {
    var flag = false;
    for (i in list) {
        if (checkPalindrome(list[i])) {
            flag = true;
            return flag;
        }
    }
    return flag;
}
function getAllVariations(str) {
    var ddmmyyyy = str;
    var mmddyyyy = str.charAt(2) + str.charAt(3) + str.charAt(0) + str.charAt(1) + str.charAt(4) + str.charAt(5) + str.charAt(6) + str.charAt(7);
    var yyyymmdd = str.charAt(4) + str.charAt(5) + str.charAt(6) + str.charAt(7) + str.charAt(2) + str.charAt(3) + str.charAt(0) + str.charAt(1);
    var ddmmyy = str.charAt(0) + str.charAt(1) + str.charAt(2) + str.charAt(3) + str.charAt(6) + str.charAt(7);
    var mmddyy = str.charAt(2) + str.charAt(3) + str.charAt(0) + str.charAt(1) + str.charAt(6) + str.charAt(7);
    var yymmdd = str.charAt(6) + str.charAt(7) + str.charAt(2) + str.charAt(3) + str.charAt(0) + str.charAt(1);
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function checkPalindrome(str) {
    return str === reverseString(str);
}

function getDateString(day, month, year) {
    var temp = "";
    if (day <= 9) {
        temp = temp + "0" + day;
    } else {
        temp = temp + day;
    }
    if (month <= 9) {
        temp = temp + "0" + month;
    } else {
        temp = temp + month;
    }
    temp = temp + year;
    return temp;
}