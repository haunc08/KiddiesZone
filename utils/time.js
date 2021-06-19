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
