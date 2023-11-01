import React from "react";

const DatePicker = ({ days, months, years }) => {
  return (
    <div>
      <select id="day" name="day">
        {days.map((day, index) => (
          <option key={index} value={index + 1}>
            {day}
          </option>
        ))}
      </select>
      <select id="month" name="month">
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <select id="year" name="year">
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;
