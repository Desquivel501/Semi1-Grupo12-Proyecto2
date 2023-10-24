const API = import.meta.env.VITE_API;
import { getSession } from "../auth/auth";

export function registrar(data) {
    return fetch(`${API}/users/create`, {
      method: "POST",
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function sendFormData({ endpoint, data }) {
    
    const session = await getSession();
    const idToken = session.idToken

    return fetch(`${API}${endpoint}`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${idToken.jwtToken}`,
            "Access-Control-Allow-Origin_Origin": "*",
        },
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}