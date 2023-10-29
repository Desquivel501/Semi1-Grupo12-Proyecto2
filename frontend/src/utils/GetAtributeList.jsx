import { CognitoUserAttribute } from "amazon-cognito-identity-js"

export function getAttributeList(user){
    const attributeList = []

    //name
    if(user.name){
        const dataName = {
            Name: 'name',
            Value: user.name
        }
        attributeList.push(new CognitoUserAttribute(dataName))
    }

    //family_name
    if(user.lastname){
        const dataFamilyName = {
            Name: 'family_name',
            Value: user.lastname
        }
        attributeList.push(new CognitoUserAttribute(dataFamilyName))
    }

    //picture
    if(user.avatar){
        const dataPicture = {
            Name: 'picture',
            Value: user.avatar
        }
        attributeList.push(new CognitoUserAttribute(dataPicture))
    }

    //email
    if(user.email){
        const dataEmail = {
            Name: 'email',
            Value: user.email
        }
        attributeList.push(new CognitoUserAttribute(dataEmail))
    }

    //dpi
    if(user.dpi){
        const dataDpi = {
            Name: 'custom:dpi',
            Value: user.dpi
        }
        attributeList.push(new CognitoUserAttribute(dataDpi))
    }

    return attributeList
}