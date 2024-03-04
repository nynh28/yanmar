export function resetForm(formList) {
  for (let form in formList) {
    let myForm = document.getElementsByName(formList[form].formName)
    for (let row in formList[form].fieldRow) {
      for (let propsName in formList[form].fieldRow[row].properties) {
        let propsType = formList[form].fieldRow[row].properties[propsName].type
        let oldValue = formList[form].fieldRow[row].properties[propsName].value


        if (oldValue === undefined) oldValue = ""
        if (propsType == "string" || propsType == "text" || propsType == "number") {
          myForm[0][propsName].value = oldValue
          // myForm[0][propsName + 'checkValidate'].click()
        }
        // else {
        //   let id = myForm[0][propsName + '0'].id
        //   let value = myForm[0][propsName + '0'].value
        //   myForm[0][propsName + '0'].click()
        //   formData[id] = value
        // }
      }
    }
  }
}
