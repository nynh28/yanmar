import { get } from 'lodash'
import data from '../Config/FieldName.json'

export function getFieldName(key, language = "en") {
    let obj = data.fieldName.find(x => x.key === key);
    try {
        if (obj !== undefined) return get(obj, language, "No found language : " + language)
        else return "No found key : " + key
    }
    catch (error) {
        return error
    }
}