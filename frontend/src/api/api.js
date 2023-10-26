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
  const idToken = session.idToken;

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

export async function getData({ endpoint }) {
  const session = await getSession();
  const idToken = session.idToken;

  return fetch(`${API}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${idToken.jwtToken}`,
    },
  })
    .then((res) => res.json())
    .catch((er) => console.log(er));
}

export async function sendJsonData({ endpoint, data }) {
  const session = await getSession();
  const idToken = session.idToken;
  return fetch(`${API}${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${idToken.jwtToken}`,
      "Access-Control-Allow-Origin_Origin": "*",
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}
