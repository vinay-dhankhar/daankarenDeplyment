const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    company: String,
    message: String
});

const Contact = mongoose.model('Contact',contactFormSchema);

module.exports = Contact;