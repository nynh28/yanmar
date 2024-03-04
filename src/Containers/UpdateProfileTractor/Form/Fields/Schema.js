export function setSchema(
  defaultLanguagelist
) {

  let schema = {
    // title: "1.ข้อมูลทั่วไป",
    definitions: {
      prefix: {
        "type": "string",
        "enum": [
          "นาย", "นาง", "นางสาว"
        ]
      }
    },
    type: "object",
    // required: ["DriverDetail"],
    properties: {
      DriverDetail: {
        type: "object",
        title: "",
        properties: {
          basicData: {
            type: "object",
            required: ["defaultLanguageNav"],
            label: {
              displayName: "display_name",
              mobile: "mobile",
              email: "email",
              lineId: "line_Id",
              defaultLanguageNav: "default_language",
              attachInfo: "avartar"

            },
            list: {

              defaultLanguageNav: [
                ...defaultLanguagelist
              ],

            }
          }
        }
      }
    }
  }

  return schema
}


