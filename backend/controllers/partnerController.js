const partnerModel = require("../models/partnerModel");
const ngoModel = require('../models/NgoModel');

exports.getBrandPartners = async (req, res, next) => {
  try {
    const brands = await partnerModel.find({ type: 'brand' }); 
    res.json(brands);
  } catch (error) {
    next(error);
  }
};

exports.getOrgPartners = async (req, res, next) => {
  try {
    const people = await ngoModel.find(); 
    res.json(people);
  } catch (error) {
    next(error);
  }
};
