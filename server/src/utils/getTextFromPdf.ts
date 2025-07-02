import PdfParse from "pdf-parse";

export const getTextFromPdf = async(file: File):Promise<string> =>{
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
  return (await PdfParse(fileBuffer)).text;
}