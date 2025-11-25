import React from 'react';
import DatePicker from 'react-multi-date-picker';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerMemo = React.memo(function DatePickerMemo({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <div className="text-[14px] font-YekanBakh_Regular text-right mb-1">{label}</div>

      <DatePicker
        containerStyle={{ width: "204px" }}
        style={{
          width: "180px !important",
          height: "32px !important",
          backgroundColor: "white !important",
          border: "1px solid #d1d5dc !important",
          borderRadius: "6px !important",
          fontSize: "13px !important",
          fontFamily: "YekanBakh_Regular !important",
          padding: "4px 8px !important",
          color: "#000 !important",
        }}
        inputClass='!h-2'
        className='!h-f2 '
        value={value}

        calendarPosition="bottom-right"
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        render={<InputIcon />}

      />
    </div>
  );
});

export default DatePickerMemo;



