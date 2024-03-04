## IMPORT FORM GENERATOR

**Form Generator !**
import FormGenerator from '../../Components/FormGenerator/Form'

**Form Validation Function. >> response formData !**
import { formValidation } from "../../Components/FormGenerator/validate";

**Reset Form !**
import { resetForm } from "../../Components/FormGenerator/resetForm";


## Schema Form 
 {
        "title": "Title Header form",
        "showHeaderTitle": false,
        "formName": "FormName",
        "girdFormColumn": 2,
        "setDisabledField": false,
        "disabledField": ['firstName', 'firstName'],
        "fieldRow": [
          {
            "properties": {
              "firstName": {
                "type": "text",
                "title": "First Name",
                "value": "",
                "required": true,
                "maxLength": 10
              },
              "firstName": {
                "type": "text",
                "title": "LastName",
                "value": "",
                "required": true,
                "maxLength": 30
              }
            }
          },
          {
            "properties": {
              "age": {
                "type": "number",
                "title": "Age",
                "value": ""
              },
              "email": {
                "type": "email",
                "title": "Email",
                "value": ""
              }
            }
          },
          {
            "properties": {
              "checkbox": {
                "type": "checkbox",
                "title": "Checkbox",
                "value": "",
                "checkboxButton": [
                    {
                      "checked": false,
                      "value": '01',
                      "name": "AAA"
                    },
                    {
                      "checked": false,
                      "value": '02',
                      "name": "BBB"
                    },
                    {
                      "checked": false,
                      "value": '03',
                      "name": "CCC"
                    }
                  ]
              },
              "radioButton": {
                "type": "radio",
                "title": "Radio",
                "value": "",
                "radioButton": [
                    {
                      "checked": false,
                      "value": '01',
                      "name": "AAA"
                    },
                    {
                      "checked": false,
                      "value": '02',
                      "name": "BBB"
                    },
                    {
                      "checked": false,
                      "value": '03',
                      "name": "CCC"
                    }
                  ]
              }
            }
          },
          {
            "properties": {
              "select": {
                "type": "select",
                "title": "Select",
                "value": "",
                "selectOption": [
                   {
                     "value": '1',
                     "name": "AAA"
                   },
                   {
                     "value": '2',
                     "name": "BBB"
                   },
                   {
                     "value": '3',
                     "name": "CCC"
                   },
                   {
                     "value": '4',
                     "name": "DDD"
                   }
                 ]
              },
              "textare": {
                "type": "textare",
                "title": "Textare",
                "value": ""
              }
            }
          }  ,
          {
            "properties": {
              "age": {
                "type": "password",
                "title": "Password",
                "value": ""
              }
            }
          }
        ]
 }


## Schema Form MutliSection

   formBillingAddress: {
        "title": "Title Header form",
        "showHeaderTitle": false,
        "formName": "FormName",
        "girdFormColumn": 2,
        "setDisabledField": false,
        "disabledField": ['test01', 'test02'],
        "sections": [
          {
            "sectionTitle": "section 1",
            "fieldRow": [
              {
                "properties": {
                  "test01": {
                    "type": "text",
                    "title": "test01",
                    "maxLength": 5
                  },
                  "test02": {
                    "type": "text",
                    "title": "test02",
                    "maxLength": 100
                  }
                }
              },
              {
                "properties": {
                  "test03": {
                    "type": "text",
                    "title": "test03",
                    "maxLength": 100
                  },
                  "test04": {
                    "type": "text",
                    "title": "test04",
                    "maxLength": 5
                  }
                }
              }
            ]
          },
          {
            "sectionTitle": "section 2",
            "fieldRow": [
              {
                "properties": {
                  "test05": {
                    "type": "text",
                    "title": "test05",
                    "maxLength": 5
                  },
                  "test06": {
                    "type": "text",
                    "title": "test06",
                    "maxLength": 100
                  }
                }
              },
              {
                "properties": {
                  "test07": {
                    "type": "text",
                    "title": "test07",
                    "maxLength": 100
                  },
                  "test08": {
                    "type": "text",
                    "title": "test08",
                    "maxLength": 5
                  }
                }
              }
            ]
          }
        ]
      }


**>>> properties <<<!**

 
## Schema Form DropdownBinding



## properties of Form
"title": "Title Header form",
"showHeaderTitle": false,
"formName": "FormName",
"girdFormColumn": 2,
"setDisabledField": false,
"disabledField": ['firstName', 'firstName'],

## properties of field
"type" : 'text', 'number', 'textare', 'email','password', 'select', 'radio', 'checkbox','image', 'date'
"title" : 'TextDisplay',
"value" : 'XXXX',
"required": true/false,
"maxLength": 99,
"minLength": 99,

**type checkbox only !**
"checkboxButton": [
                    {
                      "checked": false,
                      "value": '01',
                      "name": "AAA"
                    },
                    {
                      "checked": false,
                      "value": '02',
                      "name": "BBB"
                    },
                    {
                      "checked": false,
                      "value": '03',
                      "name": "CCC"
                    }
                  ]

**type radio only !**
"radioButton": [
                    {
                      "checked": false,
                      "value": '01',
                      "name": "Yes"
                    },
                    {
                      "checked": false,
                      "value": '02',
                      "name": "No"
                    }
                  ]

**type select only !**
  "selectOption": [
                   {
                     "value": '1',
                     "name": "AAA"
                   },
                   {
                     "value": '2',
                     "name": "BBB"
                   },
                   {
                     "value": '3',
                     "name": "CCC"
                   }
                 ]

**^^^^^^^^^^^^^^^^^^^^!**


 ## Form Data response

 {
  "firstName": "XXXXXXXX",
  "lastName": "XXXXXXXX",
  "age": 99,
  "email": "mymail@mail.com",
  "checkbox": ['01','02','03'],
  "radioButton": 99,
  "select": 99,
  "textare": "XXXXXXX",
}


## How to use formGenerator

**inside render !**
  <FormGenerator schema={SchemaForm} />
  import { formValidation } from "../../Components/FormGenerator/validate";
  import { resetForm } from "../../Components/FormGenerator/resetForm";

## Call Function formValidation
**response Form Data !**
>> let formData = formValidation(['SchemaForm1','SchemaForm2'])


## Call Function Reset Form

>> resetForm(['SchemaForm1','SchemaForm2'])


## Check Valiation by stata.formValidate.isValid
this.props.isValid ? 'true : VALID'  :   'false : INVALID'

**! Connect formValidate Redux**
import { connect } from 'react-redux'
import FormValidateActions from '../../Redux/FormValidateRedux'

const mapStateToProps = (state) => ({
  isValid: state.formValidate.isValid
});
**^^^^^^^^^^^^^^^^^^^^^^^^^^^^!**
