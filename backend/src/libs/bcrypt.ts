import { hash } from "bcrypt";

const saltRounds = 10;

export async function encrypt(value: string) {
  try {
    console.log(value);
    const response = await hash(value, saltRounds);
    return response;
  } catch (error) {
    console.log(error);
    return "";
  }
}
