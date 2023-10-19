export type Credentials = {
  email: string;
  password: string;
  photo?: string;
};
export type User = {
  dpi: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatar: Express.MulterS3.File;
};
export type TranslateText = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
};
