import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
dayjs.extend(customParseFormat);
const onChange = (time, timeString) => {
  console.log(time, timeString);
};
const BasicTimePicker = () => (
  <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
);
export default BasicTimePicker;