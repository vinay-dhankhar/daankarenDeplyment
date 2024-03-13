const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  type: { type: String, enum: ['brand', 'people'], required: true },
  logo: { type: String, required: function () { return this.type === 'brand'; } },
  name: { type: String, required: true },
  image: { type: String, required: function () { return this.type === 'people'; } },
  profession: { type: String, required: function () { return this.type === 'people'; } }
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
