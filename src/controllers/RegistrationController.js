const RegistrationModel = require('../models/RegistrationModel');

exports.create = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files;

    const newData = {
      ...body,
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
