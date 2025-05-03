const db = require("../config/db");

const RegistrationModel = {
  create: async (data) => {
    // Ensure that 'notify' is stored as 1 for true and 0 for false
    const notify = data.notify === true ? 1 : 0;

    // Convert dob to the 'YYYY-MM-DD' format
    const dob = new Date(data.dob);
    const dobFormatted = dob.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const [result] = await db.execute(
      `
      INSERT INTO registrations (
        first_name, middle_name, last_name, father_name, gender, dob, nationality,
        pan_number, gst_number, aadhaar_number, education, residential_address,
        business_address, alt_contact, email, local_reference, business_name,
        circle, ssa, area, zone, pan_file, aadhaar_file, marksheet_file,
        photo_file, video_file, otp, security_deposit, notify
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        data.first_name,
        data.middle_name,
        data.last_name,
        data.father_name,
        data.gender,
        dobFormatted,  // Send the formatted date
        data.nationality,
        data.pan_number,
        data.gst_number,
        data.aadhaar_number,
        data.education,
        data.residential_address,
        data.business_address,
        data.alt_contact,
        data.email,
        data.local_reference,
        data.business_name,
        data.circle,
        data.ssa,
        data.area,
        data.zone,
        data.pan_file,
        data.aadhaar_file,
        data.marksheet_file,
        data.photo_file,
        data.video_file,
        data.otp,
        data.security_deposit,
        notify, // Send as 1 or 0
      ]
    );
    return result;
  },

  getAll: async () => {
    const [rows] = await db.query(`SELECT * FROM registrations`);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(`SELECT * FROM registrations WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  },
};

module.exports = RegistrationModel;
