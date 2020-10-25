'use strict';

let timeend = new Date(),
    payday = new Date(2020, 9, 12, 15) / 1000;
timeend = new Date(2020, 10, 10, 15);
// Для задания даты с точностью до времени укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);
let daysBS = (timeend / 1000) - payday;
let payrollLoading;

function time() {
    let today = new Date();
    today = Math.floor((timeend - today));

    // payrollLoading
    payrollLoading = 100 - (100 / (daysBS / (today / 1000)));
    if (payrollLoading > 100) {
        payrollLoading = 'Error !!!';
        document.querySelector(".loader").style.display = 'none';
        document.querySelector(".textPayDay > span").style.opacity = '' + getRandomInt(2) + '';
    } else {
        payrollLoading = payrollLoading.toFixed(5) + '%';
    }
    // END payrollLoading

    let tmil = today % 60;
    today = Math.floor(today / 1000);
    if (tmil < 10 && tmil >= 0) {
        tmil = '0' + tmil;
    }
    let tsec = today % 60;
    today = Math.floor(today / 60);
    if (tsec < 10 && tsec >= 0) {
        tsec = '0' + tsec;
    }
    let tmin = today % 60;
    today = Math.floor(today / 60);
    if (tmin < 10 && tmin >= 0) {
        tmin = '0' + tmin;
    }
    let thour = today % 24;
    today = Math.floor(today / 24);
    if (thour < 10 && thour >= 0) {
        thour = '0' + thour;
    }

    document.querySelector(".blockLoader").style.background = `linear-gradient(to right, #52ad32 ${payrollLoading}, white ${payrollLoading})`;
    const time = document.getElementById('time');

    time.querySelector(".dayTime").innerHTML = `${today} :`;
    time.querySelector(".hourTime").innerHTML = `${thour} :`;
    time.querySelector(".minTime").innerHTML = `${tmin} :`;
    time.querySelector(".secTime").innerHTML = `${tsec} :`;
    time.querySelector(".milTime").innerHTML = tmil;
    time.querySelector(".textPayDay > span").innerHTML = payrollLoading;


    for (let i = 0; i < document.querySelector("#time").children.length; i++) {
        const timeBlock = document.querySelector("#time").children[i];
        for (let key = 0; key < timeBlock.children.length; key++) {
            switch (true) {
                case today >= 15:
                    document.querySelector("body").style.backgroundColor = 'black';
                    timeBlock.children[key].style.color = 'white';
                    break;
                case today < 15 && today >= 0:
                    document.querySelector("body").style.backgroundColor = 'white';
                    timeBlock.children[key].style.color = 'black';
                    break;
                case today < 0:
                    document.querySelector("body").style.backgroundColor = 'red';
                    timeBlock.children[key].style.color = 'white';
                    break;
            }
        }
    }

}
time();
let intervalTime = setInterval(time, 100);

// calculPay

const inputCalculPay = document.querySelector("#inputCalculPay"),
    buttonCalculPay = document.querySelector("#buttonCalculPay");

buttonCalculPay.addEventListener('click', () => {
    if (inputCalculPay.value) {
        document.cookie = `pay=${inputCalculPay.value}; path=/`;
        console.log(getCookie('pay'));
    }
});


function calculateSalary() {
    const holidays = [
        [12, 25], // Католическое Рождество

    ];

    let d = new Date(),
        currentDay = d.getDate(), //d.getDate()
        year = d.getYear() + 1900,
        month = d.getMonth(),
        day = d.getDay(), //d.getDay()
        hour = d.getHours(), //d.getHours()
        total = 0,
        done = 0;
    for (let day = 1; day <= 31; day++) {
        let t = new Date(year, month, day);
        if (t.getMonth() > month) {
            break;
        }
        if (t.getDay() == 0 || t.getDay() == 6) {
            continue;
        }
        if (holidays.some(h => h[0] - 1 === month && h[1] === day)) {
            continue;
        }
        total++;
        if (t.getDate() <= currentDay) {
            done++;
        }
    }

    let startDayPay = new Date(year, month, currentDay, 9);

    let earnedForDays = (getCookie('pay') / total) * done,
    earnedForOneDay = getCookie('pay') / total;
    let totalEarned;

    if (hour < 17 && hour >= 9 && day != 6 && day != 0) {
        let earningsPerHour = (getCookie('pay') / total) / 8;
        let workingHoursHavePassed = ((d - startDayPay) / 3.6e+6) * earningsPerHour;

        let earnADay = (earnedForDays - earnedForOneDay) + workingHoursHavePassed;
        totalEarned = earnADay;
        window.setTimeout("calculateSalary()", 100);
    } else {
        totalEarned = earnedForDays;
        window.setTimeout("calculateSalary()", 10000);
    }

    totalEarned = new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH'
    }).format(totalEarned);

    document.querySelector("#time .yourPay > p > span").innerHTML = `${getCookie('pay')} грн. - месяц | ${earnedForOneDay} грн. - день`;
    document.querySelector("#time .payCap > p > span").innerHTML = totalEarned;

}
calculateSalary();

// function

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

}