import React from 'react'
import { toast } from 'react-toastify';

export const toastNotif = (title, type = "success") => {
  toast(title, {
    type,
    position: "top-center",
    style: {
      fontFamily: "YekanBakh_Regular",
      fontSize: "13px",
      direction: "rtl",
    },
  });
};

