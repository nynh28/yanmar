
// export function formValidation(formValidateList) {
//   let formData = {}
//   for (let form in formValidateList) {
//     let myForm = document.getElementsByName(formValidateList[form].formName)
//     console.log(myForm)
//     for (let row in formValidateList[form].fieldRow) {
//       for (let propsName in formValidateList[form].fieldRow[row].properties) {
//         let propsType = formValidateList[form].fieldRow[row].properties[propsName].type
//         console.log(propsType)
//         if (propsType === "radio") {
//           let i = 0
//           let value = ''
//           while (true) {
//             let form = myForm[0][propsName + i]
//             if (!form) { break }
//             else if (form.className.includes('active')) { value = form.value; break }
//             i++
//           }
//           myForm[0][propsName + 'checkValidate'].click()
//           formData[propsName] = value

//         }
//         else if (propsType === "checkbox") {
//           let i = 0
//           let value = []
//           while (true) {
//             let form = myForm[0][propsName + i]
//             if (!form) { break }
//             else if (form.className.includes('active')) { value.push(form.value) }
//             i++
//           }
//           myForm[0][propsName + 'checkValidate'].click()
//           formData[propsName] = value
//         }
//         else {
//           let id = myForm[0][propsName].id
//           let value = myForm[0][propsName].value
//           myForm[0][propsName + 'checkValidate'].click()
//           formData[id] = value
//         }
//       }
//     }
//   }
//   return formData
// }





//////////////////////////////////////
let formData = {}

export function formValidation(formValidateList) {
  formData = {}
  for (let form in formValidateList) {
    let myForm = document.getElementsByName(formValidateList[form].formName)

    if (formValidateList[form].fieldRow !== undefined) {
      validate(myForm, formValidateList[form].fieldRow)
    }
    else {
      for (let sect in formValidateList[form].section) {
        let _fieldRow = formValidateList[form].section[sect].fieldRow
        validate(myForm, _fieldRow, formData)
      }
    }
  }
  return formData
}

function validate(myForm, formValidateList) {

  for (let row in formValidateList) {
    for (let propsName in formValidateList[row].properties) {
      let propsType = formValidateList[row].properties[propsName].type
      if (propsType === "radio") {
        let i = 0
        let value = ''
        while (true) {
          let form = myForm[0][propsName + i]
          if (!form) { break }
          else if (form.className.includes('active')) { value = form.value; break }
          i++
        }
        myForm[0][propsName + 'checkValidate'].click()
        formData[propsName] = value

      }
      else if (propsType === "checkbox") {
        let i = 0
        let value = []
        while (true) {
          let form = myForm[0][propsName + i]
          if (!form) { break }
          else if (form.className.includes('active')) { value.push(form.value) }
          i++
        }
        myForm[0][propsName + 'checkValidate'].click()
        formData[propsName] = value
      }
      else {
        let id = myForm[0][propsName].id
        let value = myForm[0][propsName].value
        myForm[0][propsName + 'checkValidate'].click()
        formData[id] = value
      }
    }
  }
  return formData
} 
