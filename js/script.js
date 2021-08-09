"use strict";

// buttonCalk

const currents=[];

const rightBlock = document.querySelector("body > main > div > div.rightBlock");

    rightBlock.querySelector("#buttonCalculPay").addEventListener('click', () => {
        fieldValidation();
});
    rightBlock.querySelector("#inputCalculPay").addEventListener('keydown', (e) => {
        if (13 == e.keyCode) {
            fieldValidation();
        }
    });

function fieldValidation() {
    if (rightBlock.querySelector("#inputLastPaymentDate").value) {
        document.cookie = `lastPaymentDate=${rightBlock.querySelector("#inputLastPaymentDate").value}; path=/`;
        rightBlock.querySelector(".lastPaymentDate").innerHTML = getCookie('lastPaymentDate');
    }
    if (rightBlock.querySelector("#inputPlanPaymentDate").value) {
        document.cookie = `planPaymentDate=${rightBlock.querySelector("#inputPlanPaymentDate").value}; path=/`;
        rightBlock.querySelector(".planPaymentDate").innerHTML = getCookie('planPaymentDate');
    }
    if (rightBlock.querySelector("#inputStartWorkingDay").value) {
        document.cookie = `startWorkingDay=${rightBlock.querySelector("#inputStartWorkingDay").value}; path=/`;
        rightBlock.querySelector(".startWorkingDay").innerHTML = getCookie('startWorkingDay');
    }
    if (rightBlock.querySelector("#inputEndWorkingDay").value) {
        document.cookie = `endWorkingDay=${rightBlock.querySelector("#inputEndWorkingDay").value}; path=/`;
        rightBlock.querySelector(".endWorkingDay").innerHTML = getCookie('endWorkingDay');
    }
    if (rightBlock.querySelector("#inputCalculPay").value) {
        document.cookie = `pay=${rightBlock.querySelector("#inputCalculPay").value}; path=/`;
        rightBlock.querySelector(".calculPay").innerHTML = getCookie('pay');
    }
    time();
    calculateSalary();
}




function time() {
    rightBlock.querySelector(".lastPaymentDate").innerHTML = getCookie('lastPaymentDate');
    rightBlock.querySelector(".planPaymentDate").innerHTML = getCookie('planPaymentDate');
    rightBlock.querySelector(".startWorkingDay").innerHTML = getCookie('startWorkingDay');
    rightBlock.querySelector(".endWorkingDay").innerHTML = getCookie('endWorkingDay');
    rightBlock.querySelector(".calculPay").innerHTML = getCookie('pay');
    if (getCookie('lastPaymentDate') == undefined) {
        document.cookie = `lastPaymentDate=2021-07-12; path=/`;
        // rightBlock.querySelector(".lastPaymentDate").innerHTML = 'Нет данных';
    }
    if (getCookie('planPaymentDate') == undefined) {
        document.cookie = `planPaymentDate=2021-08-12; path=/`;
        // rightBlock.querySelector(".planPaymentDate").innerHTML = 'Нет данных';
    }
    if (getCookie('startWorkingDay') == undefined) {
        document.cookie = `startWorkingDay=09:00; path=/`;
        // rightBlock.querySelector(".startWorkingDay").innerHTML = 'Нет данных';
    }
    if (getCookie('endWorkingDay') == undefined) {
        document.cookie = `endWorkingDay=18:00; path=/`;
        // rightBlock.querySelector(".endWorkingDay").innerHTML = 'Нет данных';
    }
    if (getCookie('pay') == undefined) {
        rightBlock.querySelector(".calculPay").innerHTML = 'Нет данных';
    }

    let funSplitData = function (stringData) {
        let arr = stringData.split(/[- :]/),
        data = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
        return data;
    };

    let payday = funSplitData(`${getCookie('lastPaymentDate')} 12:00:00`) / 1000,
    timeend = funSplitData(`${getCookie('planPaymentDate')} 15:00:00`);

    // Для задания даты с точностью до времени укажите дату в формате:
    // timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);
    let daysBS = (timeend / 1000) - payday;
    let today = new Date();
    today = Math.floor((timeend - today));
    if (today) {
        
    // payrollLoading
    let payrollLoading = 100 - (100 / (daysBS / (today / 1000)));
    if (payrollLoading < 0 || payrollLoading === Infinity || payrollLoading >= 100) {
        payrollLoading = 'Error !!!';
        document.querySelector(".loader").style.display = 'none';
        document.querySelector(".textPayDay > span").style.opacity = getRandomInt(2);
    } else {
        document.querySelector(".textPayDay > span").style.opacity = '1';
        payrollLoading = payrollLoading.toFixed(5) + '%';
        document.querySelector(".loader").style.display = 'flex';
    }
    // END payrollLoading

    let tmil = today % 60;
    today = Math.floor(today / 1000);
    if (tmil < 10 && tmil >= 0 & tmil < 0) {
        tmil = '0' + tmil;
    }
    let tsec = today % 60;
    today = Math.floor(today / 60);
    if (tsec < 10 && tsec >= 0 && tsec < 0) {
        tsec = '0' + tsec;
    }
    let tmin = today % 60;
    today = Math.floor(today / 60);
    if (tmin < 10 && tmin >= 0 && tmin < 0) {
        tmin = '0' + tmin;
    }
    let thour = today % 24;
    today = Math.floor(today / 24);
    if (thour < 10 && thour >= 0 && thour < 0) {
        thour = '0' + thour;
    }
    
    document.querySelector(".blockLoader").style.background = `linear-gradient(to right, #52ad32 ${payrollLoading}, white ${payrollLoading})`;
    const time = document.getElementById('time');

    if (tsec < 0) {
        today += 1;
        thour += 1;
        tsec += 1;
    }
    if (tmin < 0) {
        tmin += 1;
    }

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
                    document.querySelector("body").classList.add('white');
                    document.querySelector("body").classList.remove('black');
                    document.querySelector("body").classList.remove('red');
                    break;
                case today < 15 && today >= 0 && tsec > 0:
                    document.querySelector("body").style.backgroundColor = 'white';
                    document.querySelector("body").classList.add('black');
                    document.querySelector("body").classList.remove('white');
                    document.querySelector("body").classList.remove('red');
                    break;
                case today <= 0 && tsec < 0:
                    document.querySelector("body").style.backgroundColor = 'red';
                    document.querySelector("body").classList.add('red');
                    document.querySelector("body").classList.remove('white');
                    document.querySelector("body").classList.remove('black');
                    break;
            }
        }
    }
}

}
time();
let intervalTime = setInterval(time, 100);

// calculPay


function calculateSalary() {
    const holidays = [
        [12, 27], // Католическое Рождество
        [1, 1], // Новый год
        [1, 4], [1, 5], [1, 6], // Выходные в компании
        [1, 7], // Старый новый год
        [5, 3], [5, 4], // Майские, Пасха
        [5, 10], // День победы
        [6, 21], // Троица
        [6, 28], // День Конституции
        [8, 23],
        [10, 14],





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

    let startDayPay = new Date(year, month, currentDay, parseInt(getCookie('startWorkingDay')));
    let earnedForDays = (getCookie('pay') / total) * done,
    earnedForOneDay = getCookie('pay') / total;
    let totalEarned;

    let workDayHour = parseInt(getCookie('endWorkingDay')) - parseInt(getCookie('startWorkingDay'));

    if (hour < parseInt(getCookie('endWorkingDay')) && hour >= parseInt(getCookie('startWorkingDay')) && day != 6 && day != 0) {
        let earningsPerHour = (getCookie('pay') / total) / workDayHour;
        let workingHoursHavePassed = ((d - startDayPay) / 3.6e+6) * earningsPerHour;

        let earnADay = (earnedForDays - earnedForOneDay) + workingHoursHavePassed;
        totalEarned = earnADay;
        window.setTimeout("calculateSalary()", 100);
    } else if (hour < parseInt(getCookie('startWorkingDay'))){
        totalEarned = earnedForDays - earnedForOneDay;
        window.setTimeout("calculateSalary()", 10000);
    } else {
        totalEarned = earnedForDays;
        window.setTimeout("calculateSalary()", 10000);
    }

    totalEarned = new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH'
    }).format(totalEarned);
if (startDayPay && earnedForDays) {
    document.querySelector("#time .yourPay > p > span").innerHTML = `${getCookie('pay')} грн. | ${currents[0] ? (getCookie('pay') / currents[0].rate).toFixed(2) : 'loading...'} € | ${currents[1] ? (getCookie('pay') / currents[1].rate).toFixed(2) : 'loading...'} $ - месяц <br> ${earnedForOneDay.toFixed(2)} грн. | ${currents[0] ? (earnedForOneDay / currents[0].rate).toFixed(2) : 'loading...'} € | ${currents[1] ? (earnedForOneDay / currents[1].rate).toFixed(2) : 'loading...'} $ - день`;
    document.querySelector("#time .payCap > p > span").innerHTML = totalEarned;
}
}
calculateSalary();
getCurrent(['EUR', 'USD']);

// function
/**
 * Specify the list of required currencies
 * @param {string[]} nameCurrency
 */
async function getCurrent(nameCurrency) {
    const toDay = getDataDay();
    const responses = await fetch(setDataURL(toDay));
    const data = await responses.json();
    data.forEach(item => {
        if (nameCurrency.includes(item.cc)) {
            currents.push({name:item.cc, rate: item.rate});
        }
    });

    function getDataDay() {
        const data = new Date();
        let year = data.getFullYear(),
        month = data.getMonth() + 1,
        day = data.getDate();
        let dataDay = `${year}${(month >= 10) ? month : "0"+month}${(day >= 10) ? day : "0"+day}`;
        return dataDay;
    }
    function setDataURL(day) {
        let dataURL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${day}&json`;
        return dataURL;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;

}