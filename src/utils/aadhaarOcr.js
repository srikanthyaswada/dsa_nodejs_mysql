const Tesseract = require("tesseract.js");
const path = require("path");

async function parseAadhaar(filePath) {
  const { data: { text } } = await Tesseract.recognize(filePath, 'eng');

  // Basic Aadhaar text parsing
  const nameMatch = text.match(/(?<=Name[:\s]?)([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
  const genderMatch = text.match(/Male|Female|MALE|FEMALE/i);
  const dobMatch = text.match(/(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})/);
  const aadhaarMatch = text.match(/\d{4}\s\d{4}\s\d{4}/);

  return {
    name: nameMatch?.[1] || '',
    gender: genderMatch?.[0] || '',
    dob: dobMatch?.[0] || '',
    aadhaar_number: aadhaarMatch?.[0]?.replace(/\s/g, '') || ''
  };
}

module.exports = { parseAadhaar };
