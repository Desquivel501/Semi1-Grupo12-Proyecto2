import { CognitoUserAttribute } from "amazon-cognito-identity-js"
import { User } from "../customTypes/types"

export function getAttributeList(user: User){
    const attributeList: CognitoUserAttribute[] = []

    let key: keyof typeof user

    //name
    const dataName = {
        Name: 'name',
        Value: user.name
    }
    attributeList.push(new CognitoUserAttribute(dataName))

    //family_name
    const dataFname = {
        Name: 'family_name',
        Value: "" 
    }
    attributeList.push(new CognitoUserAttribute(dataFname))

    //family_name
    const dataPicture = {
        Name: 'picture',
        Value: user.avatar
    }
    attributeList.push(new CognitoUserAttribute(dataPicture))

    //email
    const dataEmail = {
        Name: 'email',
        Value: user.email
    }
    attributeList.push(new CognitoUserAttribute(dataEmail))

    //dpi
    const dataDpi = {
        Name: 'custom:dpi',
        Value: `${user.dpi}`
    }
    attributeList.push(new CognitoUserAttribute(dataDpi))

    return attributeList
}