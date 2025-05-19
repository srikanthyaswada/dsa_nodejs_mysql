const RegistrationModel = require('../models/RegistrationModel');
const { parseAadhaar } = require('../utils/aadhaarOcr');
const path = require('path');

exports.create = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files;

    const aadhaarFilePath = files.aadhaar_file?.[0]?.path;

    // Run OCR on the uploaded Aadhaar file
    let aadhaarData = {};
    if (aadhaarFilePath) {
      aadhaarData = await parseAadhaar(path.resolve(aadhaarFilePath));
    }

    const newData = {
      ...body,
      first_name: body.first_name || aadhaarData.name || '',
      gender: body.gender || aadhaarData.gender || '',
      dob: body.dob || aadhaarData.dob || '',
      aadhaar_number: body.aadhaar_number || aadhaarData.aadhaar_number || '',
      pan_file: files.pan_file?.[0]?.filename || '',
      aadhaar_file: files.aadhaar_file?.[0]?.filename || '',
      marksheet_file: files.marksheet_file?.[0]?.filename || '',
      photo_file: files.photo_file?.[0]?.filename || '',
      video_file: files.video_file?.[0]?.filename || '',
      notify: body.notify === 'true' ? 1 : 0,
    };

    const result = await RegistrationModel.create(newData);
    res.status(201).json({ message: 'Registration successful', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating registration' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await RegistrationModel.getAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await RegistrationModel.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
};
