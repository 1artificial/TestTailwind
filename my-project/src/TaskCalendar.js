// TaskCalendar.js
import React, { useState } from "react";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const TaskCalendar = ({ onDateSelect }) => {
  const [value, setValue] = useState([]);

  const handleDateChange = (dates) => {
    setValue(dates);
    onDateSelect(dates);
  };

  return (
    <Group className="ml-16">
      <DatePicker
        type="multiple"
        value={value}
        onChange={handleDateChange}
        size="md"
      />
    </Group>
  );
};

export default TaskCalendar;
