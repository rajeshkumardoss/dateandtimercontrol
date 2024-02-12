import * as React from "react";
import { Field, FluentProvider, makeStyles, webLightTheme } from "@fluentui/react-components";
import { DatePicker, DatePickerProps } from "@fluentui/react-datepicker-compat";
import { IComponentProps } from './IComponentProps';

import {
  TimePicker,
  TimePickerProps,
  formatDateToTimeString,
} from "@fluentui/react-timepicker-compat";

const useStyles = makeStyles({
  root: {
    display: "grid",
    columnGap: "20px",
    gridTemplateColumns: "repeat(2, 1fr)",
    maxWidth: "600px",
    marginBottom: "10px",
  },
});

 export const TimePickerWithDatePicker = (props:IComponentProps) => {
  
  const styles = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<
    Date | null | undefined
  >(null);

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timePickerValue, setTimePickerValue] = React.useState<string>(
    selectedTime ? formatDateToTimeString(selectedTime) : ""
  );

  const onSelectDate: DatePickerProps["onSelectDate"] = (date) => {
   
    setSelectedDate(date);
    props.context.parameters.datetime.raw = date==undefined?null:date;
    props.notifyOutputChanged();
    if (date && selectedTime) {
      setSelectedTime(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        )
      );
    }
  };

  const onTimeChange: TimePickerProps["onTimeChange"] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setTimePickerValue(data.selectedTimeText ?? "");
    props.context.parameters.datetime.raw = data.selectedTime==undefined?null:data.selectedTime;
    props.notifyOutputChanged();
  };
  const onTimePickerInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTimePickerValue(ev.target.value);
  };
  const onFormatDate = (date?: Date): string => {
    let dd;
    let mm;
    if (date?.getDate()!= undefined) 
    {
      if(date.getDate()<10)
      dd = '0' + date.getDate();
      else
      dd = date.getDate()
    }

    if (date?.getMonth()!= undefined) 
    {
      if(date.getMonth()+1<10)
      mm = '0' + (date.getMonth()+1);
      else
      mm = date.getMonth()+1;
    }

    return !date ? '' : dd + '/' + mm + '/' + (date.getFullYear() % 100);
  };
  return (
    <FluentProvider theme ={webLightTheme}>
    <div>
      <div className={styles.root}>
       
          <DatePicker
            placeholder="Select a date..."
            value={selectedDate}
            formatDate={onFormatDate}
            onSelectDate={onSelectDate as (date: Date | null | undefined) => void}
          />
       
          <TimePicker
            placeholder="Select a time..."
            freeform
            dateAnchor={selectedDate ?? undefined}
            selectedTime={selectedTime}
            onTimeChange={onTimeChange}
            value={timePickerValue}
            onInput={onTimePickerInput}
          />
       
      </div>

     
    </div></FluentProvider>
  );
};
