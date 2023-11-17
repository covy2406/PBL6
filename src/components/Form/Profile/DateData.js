const day = Array.from({ length: 31 }, (_, i) => i + 1);
const days = day.map((day) => `${day}`);

const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const currentYear = new Date().getFullYear();
const year = Array.from({ length: currentYear - 1899 }, (_, i) => i + 1900);
const years = year.reverse();

export { days, months, years };
