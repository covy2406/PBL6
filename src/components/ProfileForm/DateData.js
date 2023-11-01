const day = Array.from({ length: 31 }, (_, i) => i + 1);
const days = day.map((day) => `Ngày ${day}`);

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const currentYear = new Date().getFullYear();
const year = Array.from({ length: currentYear - 1899 }, (_, i) => i + 1900);
const years = year.reverse();

export { days, months, years };
