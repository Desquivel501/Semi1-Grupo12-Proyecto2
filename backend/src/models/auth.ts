import { Credentials } from "../customTypes/types";
import { encrypt } from "../libs/object-hash"
import { cognito, AmazonCognitoIdentity, verifier} from "../libs/cognitoclient";
//import { connector } from "./database/connection";

export class AuthModel {
  static async login(credentials: Credentials, callback: Function) {
    try {
      const password = encrypt(credentials.password);
      var authenticationData = {
        Username: credentials.email as string,
        Password: password as string,
      }

      var AuthenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      )

      var userData = {
        Username: credentials.email as string,
        Pool: cognito,
      }

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      cognitoUser.authenticateUser(AuthenticationDetails, {
        onSuccess: async function(result:any){
          var accessToken = result.getIdToken().getJwtToken();
          var response = {
            email: credentials.email,
            token: accessToken
          }
          // try {
          //   const payload = await verifier.verify(
          //     accessToken
          //   );
          //   console.log("Token is valid. Payload:", payload);
          // } catch {
          //   console.log("Token not valid!");
          // }
          callback(response, true)
        },

        onFailure: function(err:any){
          console.log(err)
          callback(err, false);
        },
      })
      
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }
  static logout({ id }: { id: number }) {
  }
}
