const USER_POOL = import.meta.env.VITE_USER_POOL_ID;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const cognitoConfig = {
    UserPoolId: USER_POOL,
    ClientId: CLIENT_ID,
  }