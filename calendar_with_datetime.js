// Список праздников
var holidays = [
    // Новый год: 1 - 8 января
    { "day": 1, "month": 0, },
    { "day": 2, "month": 0, },
    { "day": 3, "month": 0, },
    { "day": 4, "month": 0, },
    { "day": 5, "month": 0, },
    { "day": 6, "month": 0, },
    { "day": 7, "month": 0, },
    { "day": 8, "month": 0, },
    
    // День защитника Отечества
    { "day": 23, "month": 1, },
    
    // Международный женский день
    { "day": 8, "month": 2, },
    
    // День Победы
    { "day": 9, "month": 4, },
];

function isHoliday(date) {
    for (var i in holidays) {
        var holiday = holidays[i];
        if (date.getDate() == holiday.day && holiday.month === date.getMonth()) {
            return true;
        }
    }
    
    return false;
}

function Calendar(id, date) {
    var year = date.getFullYear();
    var month = date.getMonth();

    // Последний день месяца
    var Dlast = new Date(year, month + 1, 0).getDate();
    var D = new Date(year, month, Dlast); 
    
    // День недели последнего дня месяца
    var DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
    
    // День недели первого дня месяца
    var DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
    
    // Для контроля того, что строк календаря с датами будет 6 штук
    var rowNumber = 6 - 1; // - 1 т.к. первый tr уже есть
    var calendar = '<tr>';
    
    // Если первый день календаря -- понедельник, тогда заполняем первой строкой
    // дни предыдущего месяца
    if (DNfirst == 1) {
        // Добавление дней предыдущего месяца
        for (var i = 7 - 1; i >= 0; i--) {
            // Если в Date в дне указывать 0, то получаем последний день предыдущего
            // месяца, соответственно, если указывать -1, то предпоследний день предыдущего
            // месяца и т.д.    
            var day = new Date(year, month, -i).getDate();
            calendar += '<td class="other">' + day + '</td>';
        }
        
        // Завершение строки таблицы и открытие следующей, в которой
        // первым днем будет понедельник
        calendar += "</tr><tr>";
        rowNumber--;
        
    } else {
        // Если первый день месяца выпадает на воскресенье
        // Все из-за того, что воскресенье 0, а не 7
        var firstDay = DNfirst;
        if (DNfirst == 0) {
            firstDay = 7;
        }
        
        // Добавление дней предыдущего месяца
        for (var i = 1; i < firstDay; i++) {
            // Если в Date в дне указывать 0, то получаем последний день предыдущего
            // месяца, соответственно, если указывать -1, то предпоследний день предыдущего
            // месяца и т.д.    
            var day = new Date(year, month, i - firstDay + 1).getDate();
            calendar += '<td class="other">' + day + '</td>';
        }
    }
    
    // Дни месяца
    for (var i = 1; i <= Dlast; i++) {
        // Выходной день
        var newdate = new Date(year, month, i);
        var isDayoff = newdate.getDay() == 6 || newdate.getDay() == 0;
        
        var td_class = "";
        
        // Выделение текущего дня
        if (i == date.getDate()) {
            td_class = "today";
        }
        
        // Если суббота или воскресенье
        if (isDayoff) {
            td_class += " dayoff";
        }
        
        // Если праздник
        if (isHoliday(newdate)) {
            td_class += " holiday";
        }
        
        // TODO: refactoring
        if (i == date.getDate()) {
            // Используя магию css рисуем круг на заднем фоне и текст в data-char
            calendar += '<td class="' + td_class + '" data-char="' + i + '"></td>';
        } else {
            calendar += '<td class="' + td_class + '" >' + i + '</td>';
        }
        
        // Если день выпадает на воскресенье, то завершаем строку таблицы и начинаем следующую
        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
            calendar += '</tr><tr>';
            rowNumber--;
        }
    }
    // Добавление дней следующего месяца
    var nextMonthDay = 1;
    for (var i = DNlast; i < 7; i++) {
        var day = new Date(year, month + 1, nextMonthDay).getDate();
        calendar += '<td class="other">' + day + '</td>';
        
        nextMonthDay++;
    }
    calendar += "</tr>";
    
    // Дозаполнеие таблицы до rowNumber строк
    for (var i = 0; i < rowNumber; i++) {
        calendar += "<tr>";
    
        for (var j = 0; j < 7; j++) {
            var day = new Date(year, month + 1, nextMonthDay).getDate();
            calendar += '<td class="other">' + day + '</td>';
            
            nextMonthDay++;
        }
        
        calendar += "</tr>";
    }
    // <tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr>-->
    var labelHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var header = "<tr>";
    for (var i in labelHeaders) {
        header += "<th>" + labelHeaders[i] + "</th>";
    }
    
    header += "</tr>"
    
    var table = '<table cellspacing="0">';
    table += '<thead>' + header + '</thead>';
    table += '<tbody>' + calendar + '</tbody>';
    table += '</table>';
    
    document.querySelector('#' + id).innerHTML = table;
}

function fill_calendar(div_id) {
    var date = new Date();
    
    //var daysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    //var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;           
    }
    
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    var seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    
    var textTime = hours + ":" + minutes + ":" + seconds;
    var textDate = daysOfWeek[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()].toLowerCase() + ", " + date.getFullYear();

    var calendar_html = '<div class="center">';
    calendar_html += '<div id="Calendar_Time">' + textTime + "</div>";
    calendar_html += '<div id="Calendar_Date">' + textDate + "</div>";
    calendar_html += '<br>';
    calendar_html += '<div id="Calendar"></div>';
    document.getElementById(div_id).innerHTML = calendar_html;
    
    Calendar("Calendar", date);
}
