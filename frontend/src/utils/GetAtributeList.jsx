import { CognitoUserAttribute } from "amazon-cognito-identity-js"

export function getAttributeList(user){
    const attributeList = []

    //name
    const dataName = {
        Name: 'name',
        Value: user.name
    }
    attributeList.push(new CognitoUserAttribute(dataName))

    //family_name
    const dataFname = {
        Name: 'family_name',
        Value: user.lastname
    }
    attributeList.push(new CognitoUserAttribute(dataFname))

    //picture
    const dataPicture = {
        Name: 'picture',
        Value: ''
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