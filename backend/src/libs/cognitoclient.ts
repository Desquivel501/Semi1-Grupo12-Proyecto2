import { CognitoJwtVerifier } from 'aws-jwt-verify'

export const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_USER_POOL_ID as string,
    clientId: process.env.AWS_CLIENT_ID as string,
    tokenUse: 'id',
})
