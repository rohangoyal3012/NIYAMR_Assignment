import pdfParse from "pdf-parse";

export async function extractTextFromPdf(buffer) {
  const data = await pdfParse(buffer);

  const raw = data.text || "";
  const pages = raw.split(/\f/g).map((t, i) => ({
    page: i + 1,
    text: t.trim(),
  }));

  if (pages.length === 1) {
    // Fallback if PDF doesn't split pages
    const chunkSize = 2500;
    const result = [];
    for (let i = 0; i < raw.length; i += chunkSize) {
      result.push({
        page: result.length + 1,
        text: raw.substring(i, i + chunkSize),
      });
    }
    return result;
  }

  return pages;
}
