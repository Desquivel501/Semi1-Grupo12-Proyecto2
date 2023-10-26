import {
  LexRuntimeV2Client,
  RecognizeTextCommand,
  RecognizeTextCommandInput,
} from "@aws-sdk/client-lex-runtime-v2";
import { configLex } from "../config/aws";

const BOT_NAME = process.env.AWS_BOT_NAME;
const BOT_ALIAS = process.env.AWS_BOT_ALIAS;
const BOT_LOCALE = process.env.AWS_BOT_LOCALE;

const lexClient = new LexRuntimeV2Client(configLex);

export async function chatBot(
  { email, text }: { email: string; text: string },
) {
  try {
    const sessionId = email.replace("@", "_");
    const params: RecognizeTextCommandInput = {
      sessionId,
      botId: BOT_NAME,
      botAliasId: BOT_ALIAS,
      text,
      localeId: BOT_LOCALE,
    };
    const command = new RecognizeTextCommand(params);
    const response = await lexClient.send(command);
    // console.log(response.messages)
    const date = new Date();
    const messages = response.messages?.map(({ content }) => ({
      content,
      sender: BOT_NAME,
      room: sessionId,
      message_date: date.toUTCString(),
    }));
    messages?.unshift({
      content: text,
      sender: email,
      message_date: date.toUTCString(),
      room: sessionId,
    });
    return messages;
  } catch (error) {
    console.log(error);
    return null;
  }
}
