import React, { Suspense } from 'react'
import moment from 'moment-timezone';
import { get, isEmpty } from 'lodash'
import { renderToString } from 'react-dom/server'
import { t } from '../helpers/Translation';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';

const mySuspense = (<Suspense />).type;


export function exportExcel({ column_header, json_data, file_name, custom_header, custom_footer, is_sub_table }) {
  let workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet('Sheet');

  let first_row = 1
  // --------------------- header ---------------------
  if (custom_header) {
    let { list, total_row } = custom_header
    if (total_row) first_row = total_row + 1
    else first_row = list.length + 1
    for (let i in list) {
      if (!isEmpty(list[i])) {
        let { text, index_cell, merge_cell, height, font, alignment, fill, border, index_row } = list[i]

        if (typeof index_cell === 'string') {
          let index = column_header.findIndex((item) => item === index_cell)
          if (index > -1) index_cell = index
        }

        let row = index_row || (Number(i) + 1)
        let headerRow = worksheet.getRow(row);
        if (height !== undefined) headerRow.height = height;
        if (merge_cell !== undefined) {
          if (typeof merge_cell === 'number') worksheet.mergeCells(row, 1, row, merge_cell)
          else if (Array.isArray(merge_cell)) worksheet.mergeCells(row, merge_cell[0], row, merge_cell[1])
          else worksheet.mergeCells(row, 1, row, column_header.length)
        }
        if (text !== undefined) {
          let _text
          if (Array.isArray(text)) {
            _text = text.map((data) => rTT(data)).join('')
          }
          else _text = text
          headerRow.getCell(index_cell || 1).value = _text;
        }
        if (font !== undefined) headerRow.getCell(index_cell || 1).font = font;
        if (alignment !== undefined) headerRow.getCell(index_cell || 1).alignment = alignment;
        if (fill !== undefined) headerRow.getCell(index_cell || 1).fill = fill;
        if (border !== undefined) headerRow.getCell(index_cell || 1).border = border;
      }
    }
  }
  // --------------------------------------------------
  // -------------------- set data --------------------
  // worksheet.mergeCells(first_row, 2, first_row - 1, 2)
  if (is_sub_table) {
    let row_lv_1 = worksheet.getRow(first_row - 1)
    let row_lv_2 = worksheet.getRow(first_row)
    for (let i in column_header) {
      let item = column_header[i], idx = Number(i), col, _text = ''

      if (typeof item === 'string') _text = item
      else _text = item.text

      if (typeof item === 'object' && item.sub) col = row_lv_2.getCell(idx + 1)
      else {
        col = row_lv_1.getCell(idx + 1)
        worksheet.mergeCells(first_row - 1, idx + 1, first_row, idx + 1)
      }
      col.value = rTT(_text)
    }
  } else {
    worksheet.getRow(first_row).values = column_header.map((item, idx) => {
      let _text = ''
      if (typeof item === 'string') _text = item
      else _text = item.text
      return rTT(_text)
    })
  }

  worksheet.getRow(first_row).font = { bold: true };
  worksheet.getRow(first_row).alignment = { horizontal: 'center', vertical: 'top' };
  worksheet.columns = column_header.map((item) => {
    if (typeof item === 'string') return { key: item }
    else {
      let col = { key: item.key }
      if (item.style) col.style = item.style
      return col
    }
  })
  worksheet.columns.forEach((column, idx) => {
    if (idx !== 0 || column._key !== "")
      column.width = column._key.length < 10 ? 20 : column._key.length + 10
  })
  // console.log('columns', worksheet.columns)
  worksheet.addRows(json_data)
  worksheet.views = [
    { state: 'frozen', ySplit: first_row }
  ];
  // --------------------------------------------------
  // --------------------- footer ---------------------
  // console.log('custom_footer', custom_footer)
  // --------------------------------------------------
  // --------------------- footer ---------------------
  if (custom_footer) {
    let { list, total_row } = custom_footer
    let last_row = first_row + json_data.length
    for (let i in list) {
      if (!isEmpty(list[i])) {
        let { text, index_cell, merge_cell, height, font, alignment, fill, border, index_row } = list[i]

        if (typeof index_cell === 'string') {
          let index = column_header.findIndex((item) => item === index_cell)
          if (index > -1) index_cell = index
        }

        let row = (index_row || Number(i) + 1) + last_row
        let footerRow = worksheet.getRow(row);
        if (height !== undefined) footerRow.height = height;
        if (merge_cell !== undefined) {
          if (typeof merge_cell === 'number') worksheet.mergeCells(row, 1, row, merge_cell);
          else if (Array.isArray(merge_cell)) worksheet.mergeCells(row, merge_cell[0], row, merge_cell[1]);
          else worksheet.mergeCells(row, 1, row, column_header.length)
        }
        if (text !== undefined) {
          let _text
          if (Array.isArray(text)) {
            _text = text.map((data) => rTT(data)).join('')
          }
          else _text = text
          footerRow.getCell(index_cell || 1).value = _text;
        }
        if (font !== undefined) footerRow.getCell(index_cell || 1).font = font;
        if (alignment !== undefined) footerRow.getCell(index_cell || 1).alignment = alignment;
        if (fill !== undefined) footerRow.getCell(index_cell || 1).fill = fill;
        if (border !== undefined) footerRow.getCell(index_cell || 1).border = border;
      }
    }
  }
  // --------------------------------------------------
  // --------------------- export ---------------------
  workbook.xlsx.writeBuffer().then((buffer) => {
    let name = "Export"
    if (file_name !== undefined) {
      if (Array.isArray(file_name)) {
        name = file_name.map((data) => rTT(data)).join('')
      } else name = file_name
    }
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), (name) + '.xlsx');
  });
}

function rTT(reactSymbol) {
  if (typeof reactSymbol === 'object') {
    if (reactSymbol.type === mySuspense) reactSymbol = reactSymbol.props.children
    let str = renderToString(reactSymbol)
    str = str.replace('<div data-reactroot="">', '').replace(/<\/div>/g, '')
      .replace('<span data-reactroot="">', '').replace(/<\/span>/g, '').replace(/<!-- -->/g, '')
      .replace('&gt;', '>').replace('&lt;', '<')
    return str
  } else {
    return reactSymbol
  }
}


function setExcel(worksheet, { column_header, json_data = [], custom_header, custom_footer, is_sub_table }, f_r = 0) {
  // console.log('f_r', f_r)
  let first_row = f_r + 1
  // --------------------- header ---------------------
  if (custom_header) {
    let { list, total_row } = custom_header
    if (total_row) first_row += total_row
    else first_row += list.length
    for (let i in list) {
      if (!isEmpty(list[i])) {
        let { text, index_cell, merge_cell, height, font, alignment, fill, border, index_row } = list[i]

        if (typeof index_cell === 'string') {
          let index = column_header.findIndex((item) => item === index_cell)
          if (index > -1) index_cell = index
        }

        let row = (index_row || (Number(i) + 1)) + f_r
        let headerRow = worksheet.getRow(row);
        if (height !== undefined) headerRow.height = height;
        if (merge_cell !== undefined) {
          if (typeof merge_cell === 'number') worksheet.mergeCells(row, 1, row, merge_cell)
          else if (Array.isArray(merge_cell)) worksheet.mergeCells(row, merge_cell[0], row, merge_cell[1])
          else worksheet.mergeCells(row, 1, row, column_header.length)
        }
        if (text !== undefined) {
          let _text
          if (Array.isArray(text)) {
            _text = text.map((data) => rTT(data)).join('')
          }
          else _text = text
          headerRow.getCell(index_cell || 1).value = _text;
        }
        if (font !== undefined) headerRow.getCell(index_cell || 1).font = font;
        if (alignment !== undefined) headerRow.getCell(index_cell || 1).alignment = alignment;
        if (fill !== undefined) headerRow.getCell(index_cell || 1).fill = fill;
        if (border !== undefined) headerRow.getCell(index_cell || 1).border = border;
      }
    }
  }
  // --------------------------------------------------
  // -------------------- set data --------------------
  if (is_sub_table) {
    let row_lv_1 = worksheet.getRow(first_row - 1)
    let row_lv_2 = worksheet.getRow(first_row)
    for (let i in column_header) {
      let item = column_header[i], idx = Number(i), col, _text = ''
      if (typeof item === 'string') _text = item
      else _text = item.text
      if (typeof item === 'object' && item.sub) col = row_lv_2.getCell(idx + 1)
      else {
        col = row_lv_1.getCell(idx + 1)
        worksheet.mergeCells(first_row - 1, idx + 1, first_row, idx + 1)
      }
      col.value = rTT(_text)
    }
  } else {
    worksheet.getRow(first_row).values = column_header.map((item, idx) => {
      let _text = ''
      if (typeof item === 'string') _text = item
      else _text = item.text
      return rTT(_text)
    })
  }
  worksheet.getRow(first_row).font = { bold: true };
  worksheet.getRow(first_row).alignment = { horizontal: 'center', vertical: 'top' };
  worksheet.columns = column_header.map((item) => {
    if (typeof item === 'string') return { key: item }
    else {
      let col = { key: item.key }
      if (item.style) col.style = item.style
      return col
    }
  })
  worksheet.addRows(json_data)
  // worksheet.views = [
  //   { state: 'frozen', ySplit: first_row }
  // ];
  // --------------------------------------------------
  // --------------------- footer ---------------------
  let last_row = first_row + json_data.length
  let first_row_new = last_row
  if (custom_footer) {
    let { list, total_row } = custom_footer
    first_row_new += (total_row !== undefined ? total_row : list.length)
    for (let i in list) {
      if (!isEmpty(list[i])) {
        let { text, index_cell, merge_cell, height, font, alignment, fill, border, index_row } = list[i]

        if (typeof index_cell === 'string') {
          let index = column_header.findIndex((item) => item === index_cell)
          if (index > -1) index_cell = index
        }

        let row = (index_row || Number(i) + 1) + last_row
        let footerRow = worksheet.getRow(row);
        if (height !== undefined) footerRow.height = height;
        if (merge_cell !== undefined) {
          if (typeof merge_cell === 'number') worksheet.mergeCells(row, 1, row, merge_cell);
          else if (Array.isArray(merge_cell)) worksheet.mergeCells(row, merge_cell[0], row, merge_cell[1]);
          else worksheet.mergeCells(row, 1, row, column_header.length)
        }
        if (text !== undefined) {
          let _text
          if (Array.isArray(text)) {
            _text = text.map((data) => rTT(data)).join('')
          }
          else _text = text
          footerRow.getCell(index_cell || 1).value = _text;
        }
        if (font !== undefined) footerRow.getCell(index_cell || 1).font = font;
        if (alignment !== undefined) footerRow.getCell(index_cell || 1).alignment = alignment;
        if (fill !== undefined) footerRow.getCell(index_cell || 1).fill = fill;
        if (border !== undefined) footerRow.getCell(index_cell || 1).border = border;
      }
    }
  }
  // --------------------------------------------------
  // console.log('first_row_new', first_row_new)
  return first_row_new

}

export function exportExcelMultiData({ data_array, file_name }) {
  let workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet('Sheet');


  let first_row = 0
  // --------------------- set data ---------------------
  for (let i in data_array) {
    first_row = setExcel(worksheet, data_array[i], first_row)
  }
  // --------------------------------------------------
  // --------------------- export ---------------------
  workbook.xlsx.writeBuffer().then((buffer) => {
    let name = "Export"
    if (file_name !== undefined) {
      if (Array.isArray(file_name)) {
        name = file_name.map((data) => rTT(data)).join('')
      } else name = file_name
    }
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), (name) + '.xlsx');
  });
}


/* -------------------------------- Format column_header --------------------------------
  ส่งค่าเป็น array โดย type ข้างในมือ string กับ object => column_header = [ {}, {} ]
  1 กรณีที่ส่งมาเป็น string จะนำค่านั้นมาเป็น header เลย และใช้ตัวนั้นเป็น key ในการเชื่อมกับตัว json_data
  2 กรณีที่ส่งมาเป็น object จะสามารถส่งค่ามาได้ตังนี้ text, key, style
     2.1 text (type: string)
        => ข้อความที่ใช้แสดงบน header สามารถส่งเป็น key ใน data ได้
     2.2 key (type: string)
        => เป็น key ในการเชื่อมกับตัว json_data
     2.3 style (type: object)
        => ใช้สำหรับ set style ของ column นั้นๆ ยกตัวอย่างเช่น อยากให้ข้อความชิดซ้ายหรือชิดขวา
-------------------------------------------------------------------------------------- */

/* ----------------------- Format custom_header and custom_footer -----------------------
  1.ส่งค่ามาเป็น object โดยมี key เป็น total_row กับ list => { total_row: number, list: [{},{}] }
     1.1 total_row (type: number)
          => จำนวน row ทั้งหมดที่ต้องการสร้างขึ้น (default: ตามจำนวนใน list)
     1.2 list (type: array)
          => list ข้อมูลที่ต้องการสร้างใน header/footer โดยมี type เป็น object
  2.ใน object ของ list สามารถส่งค่าได้ดังนี้ text, index_cell, index_row, merge_cell, height, font, alignment, fill และ border
     2.1 text (type: string, array)
          => set ข้อความที่ต้องการให้โชว์ใน row นั้น
               - ส่งมาเป็น string => ในกรณีทั่วไป Ex. 'วันที่และเวลา: 19/11/2020 15:41'
               - ส่งมาเป็น array  => ในกรณีที่มีคำที่ต้องการเปลี่ยนภาษา Ex. [t('date_time'), ': ', dateTime]
     2.2 index_cell (type: number, string)
          => set Column ที่ต้องต้องการให้ข้อความไปแสดง (default: 1)
               - ส่งมาเป็น number => จะไปแสดงใน column ตามตำแหน่งตัวเลข
               - ส่งมาเป็น string => จะไปแสดงใน column ตามตำแหน่ง dataField ที่ส่งมา
               - ค่าเริ่มที่ 1
     2.3 index_row (type: number)
          => set Row ที่ต้องต้องการให้ข้อความไปแสดง (default: index + 1)
               - ค่าเริ่มที่ 1
     2.4 merge_cell (type: boolean(true), number, array(2 index only))
          => เป็นการ marge column ใน row นั้นๆ โดยมีทั้งหมด 3 กรณี
               - ส่งมาเป็น true   => merge column ตั้งแต่ 1 ถึง column สุดท้ายที่มีข้อมูล
               - ส่งมาเป็น number => merge column ตั้งแต่ 1 ถึง number ที่ส่งมา
               - ส่งมาเป็น array  => merge column ตั้งแต่ array index ที่ 0 ถึง array index ที่ 1
     2.5 height(type: number)
          => set ความสูงของ row นั้นๆ
     2.6 font (type: object)
          => set รูปแบบของตัวอักษร
          => Ex. { name: 'Segoe UI Light', size: 22, color: { argb: 'BFBFBF' }, bold: true, italic: true, underline: true }
          => link: https://github.com/exceljs/exceljs#fonts
     2.7 alignment (type: object)
          => set ตำแหน่งของข้อความ
          => Ex. { vertical: 'middle', horizontal: 'center' }
          => link: https://github.com/exceljs/exceljs#alignment
     2.8 fill (type: object)
          => set สีพื้นหลัง มีหลังๆ 2 type: pattern, gradient
          => Ex. { type: 'pattern', pattern: 'darkVertical', fgColor:{ argb: 'FFFF0000' } }
          => link: https://github.com/exceljs/exceljs#fills
          => pattern: https://github.com/exceljs/exceljs#pattern-fills
          => gradient: https://github.com/exceljs/exceljs#gradient-fills
     2.9 border (type: object)
          => set เส้นขอบ (top, left, bottom, right)
          => Ex. { left: { style: 'thin' }, bottom: { style: 'double', color: { argb: 'FF00FF00' } } }
          => link: https://github.com/exceljs/exceljs#borders

  ***หากต้องการเว้นบรรทัดโดยไม่ต้องการ set (total_row กับ index_row) ให้ส่งเป็น object ว่าง({}) ใน row ที่ต้องการ Ex. [ {text:'Row 1'}, {}, {text:'Row 3'} ]***

  link: https://github.com/exceljs/exceljs#contents

-------------------------------------------------------------------------------------- */

/* --------------------------------------- other ---------------------------------------
  1. json_data => ข้อมูลในตาราง (type: json)
  2. is_sub_table => เป็นตัวบอกว่า table มี column_header หลาย level; ตอนนี้ใช้ได้แค่ lv2
-------------------------------------------------------------------------------------- */
