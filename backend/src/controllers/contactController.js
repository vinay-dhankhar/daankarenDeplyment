// const Contact = require("../models/contactFormModel");

// async function submitForm(req, res) {
//   try {
//     const { name, email, phone, company, message } = req.body;

//     const newContact = new Contact({
//       name,
//       email,
//       phone,
//       company,
//       message
//     });

//     await newContact.save();

//     res.status(200).json({ message: 'Form data submitted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// module.exports = {
//   submitForm
// };
