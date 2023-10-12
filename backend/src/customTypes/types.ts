export type Credentials = {
  email: string;
  password: string;
  photo?: string;
};
export type User = {
  name: string;
  email: string;
  dpi: number;
  password: string;
  avatar: string;
};
export type TranslateText = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
};
