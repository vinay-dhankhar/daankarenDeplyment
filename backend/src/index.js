const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const { initializeApp } = require("firebase/app");
const authController = require("./controllers/authController");
const campaignController = require("./controllers/campaignController");
const firebaseConfig = require("./config/firebase-config");
initializeApp(firebaseConfig);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const campaignRouter = require('./routes/pendingCampaigns');
const campaignRouterApproved = require('./routes/approvedCampaigns');
const contactController = require('./controllers/contactController')
const donationController=require('./controllers/donationController')
const partnerController = require('./controllers/partnerController');
const cookieParser = require('cookie-parser');
const itemDonateRouter = require('./routes/pendingItemDonation');
const approvedItemDonations = require('./routes/approvedItemDonation');

var braintree = require("braintree");
const donation=require('./models/donationsModel');
const { itemsDonationRequest, deleteDonationRequest, approveDonationRquest } = require("./controllers/itemDonationController");
const { registerOrg, deleteRegistrationRequest,approveRegistrationRequest,getPendingRegistrations} = require("./controllers/ngoController");
const { handleRides, getRidesVolunteered, getRidesCompleted, getRidesInitiated, handlePick, handleDelivery } = require("./controllers/riderController");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "shq9mzng2k4xykmj",
  publicKey: "yj4fdxxws9yw4gdv",
  privateKey: "91b6df0d5ae42e8649bf214edf7a9491",
});

const app = express();
const port = 4000;

const mongoURI =
  "mongodb+srv://12212109:ln1RzqZA38DYPyaC@daankaren.v2slarc.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) =>
    console.error("MongoDB connection error:", error)
  );

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.post("/signup", authController.signup);
app.post("/contact", contactController.submitForm);
app.post("/RequestCampaign",upload.array('files'),authController.uploadMiddleware,campaignController.RequestCampaign);
app.use('/campaigns', campaignRouter);
app.use('/campaigns', campaignRouterApproved);
app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.post('/logout', authController.logout);
app.get('/campaigns/:campaignId',campaignController.campaignDetails);
app.post('/campaigns/:campaignId/approve',campaignController.campaignApprove);
app.delete('/campaigns/:campaignId',campaignController.campaignDelete);
app.post('/braintree/payment',donationController.payment)
app.get('/braintree/token',donationController.paymentToken);
app.post('/city' , campaignController.getByCity );
app.get('/partners/brands', partnerController.getBrandPartners);
app.get('/partners/people', partnerController.getPeoplePartners);
app.get('/fetchCampaignsOfUser/:userId',campaignController.fetchCampaignsOfUser)
app.get('/fetchDonatedCampaigns/:userId',campaignController.fetchDonatedCampaigns)
app.get('/fetchUserDetails',authController.fetchUserDetails)

app.post('/itemsDonationRequest' , authController.verifyToken , itemsDonationRequest );
app.delete('/itemsDonationRequest/delete/:donationID' , deleteDonationRequest);
app.put('/itemsDonationRequest/approve/:donationID' , approveDonationRquest);
app.use('/itemDonations' , itemDonateRouter );
app.use('/itemDonations' , approvedItemDonations );
//for ngo registration
app.get('/registerOrg/pending', getPendingRegistrations);
app.post('/registerOrg' , registerOrg);
app.delete('/registerOrg/delete/:registrationID' , deleteRegistrationRequest);
app.put('/registerOrg/approve/:registrationID' , approveRegistrationRequest);

// for volunteers
app.post('/volunteerSelf' , authController.verifyToken , handleRides );
app.get('/volunteeredRides/:userId' , getRidesVolunteered);
app.get('/completedRides/:userId' , getRidesCompleted);
app.get('/initiatedRides/:userId' , getRidesInitiated);
app.put('/handlePick/:rideId' , handlePick);
app.post('/handleDelivery/:rideId' , upload.array('files') , authController.uploadMiddleware , handleDelivery );

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
