import React, { useState, useEffect } from 'react';

function Deadline({ targetDate }) {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate)); // Update every second
    }, 1000);

    return () => clearInterval(timer); // Clear interval on unmount or targetDate change
  }, [targetDate]); // Re-run effect if targetDate changes

  function calculateTimeLeft(date) {
    // Manually parse the custom date format "DD/MM/YYYY, HH:MM:SS"
    const [datePart, timePart] = date.split(', ');
    const [day, month, year] = datePart.split('/');
    const [h, m, s] = timePart.split(':');

    // Create a valid date string in ISO format
    const isoDate = `${year}-${month}-${day}T${h}:${m}:${s}`;
    const target = new Date(isoDate).getTime(); // Get target timestamp in milliseconds
    const now = new Date().getTime(); // Get current timestamp in milliseconds

    if (isNaN(target)) {
      console.error("Invalid target date:", date); // Log invalid target date
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Return 0 values if the date is invalid
    }

    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Handle past dates
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  // List of time units and their labels
  const timeUnits = [
    { value: timeLeft.days, label: 'days' },
    { value: timeLeft.hours, label: 'hours' },
    { value: timeLeft.minutes, label: 'min' },
    { value: timeLeft.seconds, label: 'sec' }
  ];

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono font-semibold text-orange-600 text-5xl">
            <span>{unit.value}</span>
          </span>
          {unit.label}
        </div>
      ))}
    </div>
  );
}

export default Deadline;
