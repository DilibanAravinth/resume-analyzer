export type GeminiContentPayload = {
  model?: string;
  contents: Array<{
    role?: string;
    parts: Array<{
      text?: string;
      inlineData?: {
        mimeType: string;
        data: string;
      };
      fileData?: {
        mimeType: string;
        fileUri: string;
      };
      functionCall?: {
        name: string;
        args?: string;
      };
      functionResponse?: {
        name: string;
        response?: string;
      };
    }>;
  }>;
  generationConfig?: {
    response_mime_type?: string;
  };
};

export type GeminiResponse = {
  candidates: {
    content: {
      parts: {
        text?: string;
        thought?: any;
      }[];
    };
  }[];
};
