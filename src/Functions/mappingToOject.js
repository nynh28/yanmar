import { get } from 'lodash'
import { getFieldName } from './getFieldName'

export function mappingToOject(objectKey, formDataMapping, language = "en") {
    let objects = Object.getOwnPropertyNames(objectKey)
    for (let index in objects) {
        let key = objectKey[objects[index]]
        formDataMapping[objects[index]] = getFieldName(key, language)
    }
    return formDataMapping
}