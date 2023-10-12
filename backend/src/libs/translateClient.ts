import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextCommandInput,
} from "@aws-sdk/client-translate";
import { configTranslate } from "../config/aws";
import { TranslateText } from "../customTypes/types";

const translateClient = new TranslateClient(configTranslate);

export async function translateText(
  textToTranslate: TranslateText,
) {
  try {
    const params: TranslateTextCommandInput = {
      Text: textToTranslate.text,
      SourceLanguageCode: textToTranslate.sourceLanguage,
      TargetLanguageCode: textToTranslate.targetLanguage,
    };
    const translateTextCommand = new TranslateTextCommand(params);
    const textTranslated = await translateClient.send(translateTextCommand);
    console.log(textTranslated.TranslatedText);
    return textTranslated.TranslatedText;
  } catch (error) {
    console.log(error);
    return "";
  }
}
