import React, { useState } from "react";
import "./D1.css"; // Import your CSS file for styling

const D3 = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleMonthSelect = (event) => {
        const selectedMonthValue = parseInt(event.target.value, 10);
        setSelectedMonth(selectedMonthValue);
    };

    const handleYearSelect = (event) => {
        const selectedYearValue = parseInt(event.target.value, 10);
        setSelectedYear(selectedYearValue);
    };

    const getDaysInMonth = (year, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, index) => index + 1);
    };

    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const getCurrentDate = () => new Date();

    const currentYear = getCurrentDate().getFullYear();
    const currentMonth = getCurrentDate().getMonth();
    const currentDay = getCurrentDate().getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const years = Array.from(
        { length: 10 },
        (_, index) => currentYear - 5 + index
    );

    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);

    const isDateDisabled = (year, month, day) => {
        if (selectedDate) {
            const pickedYear = selectedDate.getFullYear();
            const pickedMonth = selectedDate.getMonth();
            const pickedDay = selectedDate.getDate();
            return (
                year < pickedYear ||
                (year === pickedYear && month < pickedMonth) ||
                (year === pickedYear && month === pickedMonth && day < pickedDay)
            );
        }
        return false;
    };

    return (
        <div>
            <div>
                <label>Select Month: </label>
                <select value={selectedMonth} onChange={handleMonthSelect}>
                    {monthNames.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Year: </label>
                <select value={selectedYear} onChange={handleYearSelect}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <h2>
                <select value={selectedMonth} onChange={handleMonthSelect}>
                    {monthNames.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>{" "}
                <select value={selectedYear} onChange={handleYearSelect}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {daysInMonth.map((day, index) =>
                        index % 7 === 0 ? (
                            <tr key={index}>
                                {Array.from({ length: 7 }, (_, i) => i).map((d) => {
                                    const dayNumber = index - firstDayOfMonth + d + 1;
                                    const isCurrentMonth =
                                        dayNumber > 0 && dayNumber <= daysInMonth.length;
                                    const isToday =
                                        isCurrentMonth &&
                                        selectedYear === currentYear &&
                                        selectedMonth === currentMonth &&
                                        dayNumber === currentDay;
                                    const isPickedDate =
                                        selectedDate &&
                                        selectedYear === selectedDate.getFullYear() &&
                                        selectedMonth === selectedDate.getMonth() &&
                                        dayNumber === selectedDate.getDate();
                                    const isDisabled = isDateDisabled(
                                        selectedYear,
                                        selectedMonth,
                                        dayNumber
                                    );

                                    return (
                                        <td
                                            key={d}
                                            onClick={() =>
                                                !isDisabled &&
                                                isCurrentMonth &&
                                                handleDateSelect(
                                                    new Date(selectedYear, selectedMonth, dayNumber)
                                                )
                                            }
                                            className={
                                                isToday
                                                    ? "today"
                                                    : isPickedDate
                                                        ? "picked"
                                                        : isCurrentMonth
                                                            ? isDisabled
                                                                ? "disabled"
                                                                : "active"
                                                            : "inactive"
                                            }
                                        >
                                            {isCurrentMonth ? dayNumber : ""}
                                        </td>
                                    );
                                })}
                            </tr>
                        ) : null
                    )}
                </tbody>
            </table>
            <div>
                Selected Date: {selectedDate ? selectedDate.toDateString() : "None"}
            </div>
        </div>
    );
};

export default D3;
