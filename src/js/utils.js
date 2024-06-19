import fromUnixTime from "date-fns/fromUnixTime";

function capitalize(words) {
  const seperatedWord = words.toLowerCase().split(" ");
  for (let i = 0; i < seperatedWord.length; i++) {
    seperatedWord[i] =
      seperatedWord[i].charAt(0).toUpperCase() + seperatedWord[i].substring(1);
  }
  return seperatedWord.join(" ");
}

function weekDay(str) {
  let day;
  switch (str) {
    case "Sun":
      day = "Sun";
      break;
    case "Mon":
      day = "Mon";
      break;
    case "Tue":
      day = "Tue";
      break;
    case "Wed":
      day = "Wed";
      break;
    case "Thu":
      day = "Thu";
      break;
    case "Fri":
      day = "Fri";
      break;
    case "Sat":
      day = "Sat";
      break;
    default:
      day = "This is not a week day";
  }
  return day;
}

function getMonth(num) {
  let month;
  switch (num) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      month = "This month does not exist";
  }
  return month;
}

function formatTime(unix, offset, timeFormat = "full") {
  const date = fromUnixTime(unix + offset).toUTCString();

  let hour = date.slice(17, 19);
  const minute = date.slice(20, 22);

  let time;
  if (hour >= 12) {
    time = "pm";
  } else {
    time = "am";
  }

  if (hour > 12) {
    hour -= 12;
  }

  if (hour < 10 && time === "am") {
    hour = hour.slice(1, 2);
  }

  if (hour === "0") {
    hour = 12;
  }

  if (timeFormat === "hour") {
    return `${hour} ${time}`;
  }

  return `${hour}:${minute}${time}`;
}

function formatDate(unix, offset, dateFormat = "weekDay") {
  const date = fromUnixTime(unix + offset).toUTCString();

  let dayOfWeek = date.slice(0, 3);
  let dayOfMonth = date.slice(5, 7);
  const month = date.slice(8, 11);
  let suffix;

  if (dayOfMonth < 10) {
    dayOfMonth = dayOfMonth.slice(1);
  }

  if (dayOfMonth.slice(-1) === "1") {
    suffix = "st";
  } else if (dayOfMonth.slice(-1) === "2") {
    suffix = "nd";
  } else if (dayOfMonth.slice(-1) === "3") {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  if (dayOfMonth > 3 && dayOfMonth < 21) {
    suffix = "th";
  }

  if (dateFormat === "weekDay") {
    dayOfWeek = weekDay(dayOfWeek);
    return dayOfWeek;
  }

  if (dateFormat === "date") {
    return `${dayOfMonth} ${month}`;
  }

  const formatDate = `${dayOfWeek}, ${dayOfMonth}${suffix} ${month},`;
  return formatDate;
}

function renderWeatherIcon(code) {
  if (code === "01d") {
    return "assets/currentIcon/clear-day-sky.svg";
  } else if (code === "01n") {
    return "assets/currentIcon/clear-night-sky.svg";
  } else if (code === "02d") {
    return "assets/currentIcon/cloudy-day.svg";
  } else if (code === "02n") {
    return "assets/currentIcon/cloudy-night.svg";
  } else if (code === "03d" || code === "03n") {
    return "assets/currentIcon/cloud.svg";
  } else if (code === "04d" || code === "04n") {
    return "assets/currentIcon/clouds.svg";
  } else if (code === "09d" || code === "09n") {
    return "assets/currentIcon/shower-rain.svg";
  } else if (code === "10d") {
    return "assets/currentIcon/day-rain.svg";
  } else if (code === "10n") {
    return "assets/currentIcon/night-rain.svg";
  } else if (code === "11d" || code === "11n") {
    return "assets/currentIcon/thunderstorm.svg";
  } else if (code === "13d" || code === "13n") {
    return "assets/currentIcon/snow.svg";
  } else if (code === "50d" || code === "50n") {
    return "assets/currentIcon/mist.svg";
  } else {
    return "assets/currentIcon/no-svg.svg";
  }
}

export { capitalize, formatDate, formatTime, renderWeatherIcon, getMonth };
