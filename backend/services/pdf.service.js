import pdfParse from "pdf-parse";

export const extractPdfText = async (buffer) => {
  const data = await pdfParse(buffer);

  const raw = data.text || "";

  // Split by form feed (page break)
  const pages = raw.split(/\f/g).map((t, i) => ({
    page: i + 1,
    text: t.trim(),
  }));

  // Fallback if only one long block
  if (pages.length === 1) {
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
};
