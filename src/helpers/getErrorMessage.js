import { get } from 'lodash'
import data from '../Config/ErrorMessage.json'

export function getErrorMessage(key, language = "en", parameters = []) {
    let subKey = ("" + key).substring(3, 6);
    if (parseInt(subKey) === 401
        || parseInt(subKey) === 500
        || parseInt(subKey) === 980
        || parseInt(subKey) === 981
        || parseInt(subKey) === 982
        || parseInt(subKey) === 983
        || parseInt(subKey) === 984
        || parseInt(subKey) === 985
        || parseInt(subKey) === 990
        || parseInt(subKey) === 991
        || parseInt(subKey) === 429
        || parseInt(subKey) === 999
        || parseInt(subKey) === 450
        || parseInt(subKey) === 451
        || parseInt(subKey) === 452
        || parseInt(subKey) === 453
    )
        return findKeyMessage(subKey, language, parameters)
    else
        return findKeyMessage(key, language, parameters)
}

function findKeyMessage(key, language, parameters) {
    key = parseInt(key)
    let obj = data.errorMessage.find(x => x.key === key);
    try {
        if (obj !== undefined) {
            if (parameters.length > 0) {
                let findLng = get(obj, language, false)
                if (!findLng) {
                    return "Not found language : " + language
                }
                else {
                    let message = "" + get(obj, language, "")
                    let result = ""
                    for (let index in parameters) {
                        result = message.replace("{" + (parseInt(index) + 1) + "}", parameters[index])
                        message = result
                    }
                    return result
                }
            }
            else {
                return get(obj, language, "Not found language : " + language)
            }
        }
        else return "Not found key : " + key
    }
    catch (error) {
        return error
    }
}

// getErrorMessage(55555, "en", ["value1", "value2"])
// getErrorMessage(100101, "en", [])