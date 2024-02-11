const WEEKEND_LIST = ["Sat", "Sun"];
const HOLIDAYS = ["Thu Aug 15 2024"];

const getDay = () => {
  const day = new Date().toDateString();
  //const day = "Thu Aug 15 2024";
  //const day = "Mon Feb 12 2024"

  if (isHoliday(day)) {
    return "Holiday";
  } else if (isWeekend(day)) {
    return "Weekend";
  }
  return "WeekDay";
};

const isHoliday = (day = "") => {
  for (const holiday of HOLIDAYS) {
    if (holiday.trim() === day.trim()) return true;
  }

  //default
  return false;
};

const isWeekend = (day = "") => {
  for (const weekend of WEEKEND_LIST) {
    if (day.trim().startsWith(weekend)) return true;
  }

  //default
  return false;
};

const getBouns = () => {
const dayType = getDay();
  if (dayType === "Holiday") {
    return 200;
  } else if (dayType === "Weekend") {
    return 100;
  }

  //default
  return 50;
};

const calulateBouns = (remaingRerral = 3) => {
    const baseBonus = getBouns();

    if(remaingRerral === 3){
        return baseBonus;
    } else if(remaingRerral === 2){
        return baseBonus * 0.50;
    } 

    return baseBonus * 0.10;
    
}
// console.log(calulateBouns(3));
// console.log(calulateBouns(2));
// console.log(calulateBouns(1));

module.exports = calulateBouns;
