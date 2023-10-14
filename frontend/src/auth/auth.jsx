import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js"

import { cognitoConfig } from "../config/cognitoConfig"
import { getAttributeList } from "../utils/GetAtributeList"

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
})

export function signUp(dpi, name, lastname, email, password) {

  const attributeList = getAttributeList({ dpi, name, lastname, email, password })

  return new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      attributeList,
      null,
      (err, result) => {
        if (err) {
          reject(err)
          return
        }
        alert('Usuario registrado exitosamente')
        resolve(result.user)
      }
    )
  })
}

export function confirmSignUp(username, code) {
  // Confirm sign up implementation
}

export function signIn(username, password) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    })

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result)
      },
      onFailure: (err) => {
        reject(err)
      },
    })
  })
}

export function forgotPassword(username) {
  // Forgot password implementation
}

export function confirmPassword(username, code, newPassword) {
  // Confirm password implementation
}

export function signOut() {
  const cognitoUser = userPool.getCurrentUser()
  if (cognitoUser) {
    cognitoUser.signOut()
  }
}

export function getCurrentUser() {
  // Get current user implementation
}

export function getSession() {
  const cognitoUser = userPool.getCurrentUser()
  return new Promise((resolve, reject) => {
    if (!cognitoUser) {
      reject(new Error("No user found"))
      return
    }
    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err)
        return
      }
      resolve(session)
    })
  })
}