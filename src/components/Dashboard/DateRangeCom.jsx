

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

export default function DateRangeCom() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MultiInputDateTimeRangeField
        slotProps={{
          textField: ({ position }) => ({
            label: position === "start" ? "Start" : "End",
          }),
        }}
        defaultValue={dayjs()}
        maxDate={dayjs()}
      />
    </LocalizationProvider>
  );
}
