const formatShortDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatLongDate = (dateTime) => {
  let date = new Date(dateTime);
  let year = date.getFullYear();
  let month = Number(date.getMonth()) + 1;
  let hours = date.getHours();
  let day = date.getDate();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  month = month < 10 ? "0" + month : month;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  day = day < 10 ? "0" + day : day;
  let strTime = hours + ":" + minutes + ":" + seconds;
  return {
    date: day + "-" + month + "-" + year,
    reverseDate: year + "-" + month + "-" + day,
    hours: strTime,
  };
};

export { formatShortDate, formatLongDate };
