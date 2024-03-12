const partnerModel = require("../models/partnerModel");

exports.getBrandPartners = async (req, res, next) => {
  try {
    const brands = await partnerModel.find({ type: 'brand' }); 
    res.json(brands);
  } catch (error) {
    next(error);
  }
};

exports.getPeoplePartners = async (req, res, next) => {
  try {
    const people = await partnerModel.find({ type: 'people' }); 
    res.json(people);
  } catch (error) {
    next(error);
  }
};
