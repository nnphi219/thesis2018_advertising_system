var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    AdsArea = require('./api/models/AdsAreaModel'),
    PriceFactor = require('./api/models/PriceFactorModel'),
    ServicePrice = require('./api/models/ServicePriceModel'),
    PromotionManagement = require('./api/models/PromotionManagementModel'),
    PostCampaignManagement = require('./api/models/PostCampaignManagementModel'),
    PostManagement = require('./api/models/PostManagementModel'),
    bodyParser = require('body-parser');
var cors = require('cors');
const fileUpload = require('express-fileupload');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/ads_system');
mongoose.connect('mongodb://admin:admin@ds263847.mlab.com:63847/thesis');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use for upload file
app.use(fileUpload());
app.use('/uploads', express.static(__dirname + '/uploads'));

var todoListRoute = require('./api/routes/todoListRoute'); //importing route
var adsAreaRoute = require('./api/routes/AdsAreaRoute');
var priceFactorRoute = require('./api/routes/PriceFactorRoute');
var servicePriceRoute = require('./api/routes/ServicePriceRoute');
var promotionManagement = require('./api/routes/PromotionManagementRoute');
var postCampaignManagement = require('./api/routes/PostCampaignManagementRoute');
let postManagement = require('./api/routes/PostManagementRoute');

todoListRoute(app); //register the route
adsAreaRoute(app);
priceFactorRoute(app);
servicePriceRoute(app);
promotionManagement(app);
postCampaignManagement(app);
postManagement(app);

app.listen(port);



console.log('todo list RESTful API server started on: ' + port);
