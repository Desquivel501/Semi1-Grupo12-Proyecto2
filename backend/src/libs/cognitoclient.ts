import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool
} from 'amazon-cognito-identity-js'
import { configCognito} from '../config/aws'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { VerifyProperties } from 'aws-jwt-verify/jwt-rsa'

export const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_USER_POOL_ID as string,
    clientId: process.env.AWS_CLIENT_ID as string,
    tokenUse: 'id',
})
export const cognito = new CognitoUserPool(configCognito)
export const AmazonCognitoIdentity = require('amazon-cognito-identity-js')