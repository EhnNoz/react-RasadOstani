import React from 'react'
import * as persianTools from "@persian-tools/persian-tools";
function useNumPersian(num) {
  const convert = persianTools.digitsEnToFa(typeof(num) == 'number' ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')  : '');
    return convert
}

export default useNumPersian
