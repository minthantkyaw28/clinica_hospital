import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { transactionSingleDayfunc } from "../../store/reducers/transactionSingleDayReducers";

export default function DatePickerPayment() {

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Fetch data when the selected date changes
  useEffect(() => {
      const fetchDataByDay = async (newDate) => {
        try {
          let data = {
            date_time: newDate, // Format the date as needed
          };

          dispatch(transactionSingleDayfunc(data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    fetchDataByDay(selectedDate);
  }, [dispatch,selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        // defaultValue={dayjs()}
        maxDate={dayjs()}
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
      />
    </LocalizationProvider>
  );
}
