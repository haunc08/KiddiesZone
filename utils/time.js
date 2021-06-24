export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;
export const MS_PER_MONTH = 30 * MS_PER_DAY;
export const MS_PER_YEAR = 12 * MS_PER_MONTH;

export const getMostRecentMonths = (numberOfMonths) => {
  // maybe getMonth return current month - 1
  let curMonth = new Date().getMonth();

  let months = [];
  while (months.length !== numberOfMonths) {
    if (curMonth >= 0) {
      months.push(curMonth + 1);
      curMonth--;
    } else curMonth = 11;
  }

  return months.reverse();
};

export const getLastMonth = (month) => {
  return month === 1 ? 12 : month - 1;
};

export const getRecentHalfYear = (noYear) => {
  let years = [];
  let curMonth = new Date().getMonth();
  const curYear = new Date().getFullYear();
  for (let i = 0; i < noYear; i++) {
    if (!(i === 0 && curMonth < 7)) years.push({ year: curYear - i, half: 1 });
    years.push({ year: curYear - i, half: 0 });
  }
  return years.reverse();
};

export const calcTimeRangeUntilNow = (date) => {
  const today = Date.now();
  let dateRange = today - date;

  const types = ["năm", "tháng", "ngày", "giờ", "phút", "giây"];
  let timeRanges = [];
  const calcRangeTypes = (time) => {
    timeRanges.push(Math.floor(dateRange / time));
    dateRange %= time;
  };

  calcRangeTypes(MS_PER_YEAR);
  calcRangeTypes(MS_PER_MONTH);
  calcRangeTypes(MS_PER_DAY);
  calcRangeTypes(MS_PER_HOUR);
  calcRangeTypes(MS_PER_MINUTE);
  calcRangeTypes(MS_PER_SECOND);

  const resultIndex = timeRanges.findIndex((val) => val > 0);
  return `${timeRanges[resultIndex]} ${types[resultIndex]} trước`;
};

export const numsToMonths = (months) => {
  return months.map((m) => {
    switch (m) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  });
};

export const halfMonths = (half) => {
  if (!half) {
    return [1, 2, 3, 4, 5, 6];
  }
  return [7, 8, 9, 10, 11, 12];
};

export const getLast7Days = () => {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d);
  }

  return result;
};
