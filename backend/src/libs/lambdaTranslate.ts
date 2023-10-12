import { TranslateText } from "../customTypes/types";

const API_TRANSLATE = process.env.API_TRANSLATE as string;

export async function translateText(
  textToTranslate: TranslateText,
) {
  try {
    const response = await fetch(API_TRANSLATE, {
      method: "POST",
      body: JSON.stringify(textToTranslate),
    });
    const textTranslated = await response.json();
    return textTranslated.translatedText ?? "";
  } catch (error) {
    console.log(error);
    return "";
  }
}
