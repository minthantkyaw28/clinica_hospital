import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

export default function DatePickerCom() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        defaultValue={dayjs()}
        maxDate={dayjs()}
      />
    </LocalizationProvider>
  );
}
// chore: note 2022-05-30T17:27:36
