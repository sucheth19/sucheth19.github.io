const OAuthToken = require('./ebay_oauth_token');
    const express = require('express')
    const app = express()
    const axios = require('axios');
    const port = 3000;
    const cors = require('cors');
    const mongoose = require('mongoose');
    app.use(cors());
    const { MongoClient, ServerApiVersion } = require('mongodb');
const e = require('express');

   
//     const client = new MongoClient('', {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
    let globalData = [];
    // mongoose.connect('mongodb://0.0.0.0:27017/wishlist', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
    // socketTimeoutMS: 30000, // Adjust the timeout as needed
    // });
    mongoose.connect("mongodb+srv://suchethg:oXbM5jCfFLQEb3jG@cluster0.gdjqav6.mongodb.net/wishList?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongodb connection error'));
    db.once('open', () => {
        console.log('Connected to MongoDB Atlas');
    });
    const productSchema = new mongoose.Schema({
        itemId:String,
        title:String,
        galleryURL:String,
        price:String,
        shippingPrice:String,
        zipCode:String,
        shippingInfo:[Object],
        returnsAccepted:Boolean
    });
    const Product = mongoose.model('Product', productSchema);



    // mongoose.connect('mongodb://localhost:27017/wishlist', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });



    app.use(express.json());

    //add wishlist api
    app.get('/products', async (req, res) => {
        try {
          // Retrieve the query parameters from the request
          const itemId = req.query.itemId || "N/A";
          const title = req.query.title || "N/A";
          // Add other query parameters as needed
          const existingProduct = await Product.findOne({ itemId });
          
          if (existingProduct) {
            // If a product with the same itemId exists, skip adding it
            return res.json({ message: 'Item with the same itemId already exists in the wishlist.' });
          }
          
          const galleryURL = req.query.galleryUrl ;
          const price = req.query.price ;
          const shippingPrice = req.query.shippingPrice;
          const zipCode = req.query.zipCode ;
          const shippingInfo = JSON.stringify(JSON.parse(req.query.shippingInfo));
          const returnsAccepted = req.query.returnsAccepted;

          const product = new Product({
            itemId,
            title,
            galleryURL,
            price,
            shippingPrice,
            zipCode,
            shippingInfo,
            returnsAccepted
          });
          await product.save();
      
          // Rest of your code to save the data to MongoDB
          res.json({ message: 'Item added to the wishlist.' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to add item to the wishlist.' });
        }
      });
      

    app.get('/all-products',async (req,res)=>{
        try{
            const allProducts = await Product.find();
            res.json(allProducts);
        }catch(error){
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    })
    // delete wishlist api
    app.delete('/products/:itemId', async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const deleteProduct = await Product.findOneAndRemove({ itemId: itemId }); // Use 'itemId' instead of 'ItemId'
            if (deleteProduct) {
                res.json({ message: 'Item removed from wishlist' });
            } else {
                res.status(404).json({ message: 'Item not found in wishlist' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete item from wishlist' });
        }
    });

    //get zip code suggestions api
    app.get('/api/zip-suggestions', async (req, res) => {
        const zipCode = req.query.zipCode; 
        const apiUrl = `http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=${zipCode}&maxRows=5&username=suchethg&country=US`;
        try {
            const response = await axios.get(apiUrl);
            const data = response.data;
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });

    // get similar products api
    app.get('/similar-products/:itemId',async (req,res)=>{
        const itemId = req.params.itemId; 
        const apiUrl =`https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=SuchethG-Dummy-PRD-e7284ce84-7ac41448&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=${itemId}&maxResults=20`;
        try{    
            const response = await axios.get(apiUrl);
            const data = response.data;
            res.json(data.getSimilarItemsResponse.itemRecommendations.item);
        }catch(error){
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    })


    // search results api
    app.get('/api/search-results',async (req,res)=>{
        const searchParams = JSON.parse(req.query.searchParams); 
        const keyword = searchParams.keyword;
        const category = searchParams.category;
        console.log('category',category)
        const newCondition = searchParams.new;
        const usedCondition = searchParams.used;
        const unspecifiedCondition = searchParams.unspecified;
        const localPickup = searchParams.local?searchParams.local:false;
        const freeShipping = searchParams.free?searchParams.free:false;
        const distance = searchParams.distance?searchParams.distance:10;
        const zipCode =searchParams.zipCode;
        const rzipCode = searchParams.rzipCode;
        const postalCode = rzipCode ? rzipCode : zipCode;
        let apiUrl = `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SuchethG-Dummy-PRD-e7284ce84-7ac41448&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50&keywords=${keyword}&buyerPostalCode=${postalCode}`
        let categoryId = 0;
        if(category==='All Categories'){
            categoryId = 0;
        }
        else if(category==='Art'){
            categoryId = 505;
        }else if(category==='Baby'){
            categoryId = 2984;
        }else if(category==='Books'){
            categoryId = 267;
        }else if(category==='Clothing, Shoes & Accessories'){
            categoryId = 11450;
        }else if(category==='Computers/Tablets & Networking'){
            categoryId = 58058;
        }else if(category==='Health & Beauty'){
            categoryId = 26395;
        }else if(category==='Music'){
            categoryId = 11233;
        }else if(category==='Video Games & Consoles'){
            categoryId = 1249;
        }

        if(category!='All Categories'){

            apiUrl += `&categoryId=${categoryId}`
        }
        let index = 0;
        apiUrl += `&itemFilter(${index}).name=MaxDistance&itemFilter(${index}).value=${distance}`;
        index++;
        apiUrl += `&itemFilter(${index}).name=FreeShippingOnly&itemFilter(${index}).value=${freeShipping}`;
        index++;
        apiUrl += `&itemFilter(${index}).name=LocalPickupOnly&itemFilter(${index}).value=${localPickup}`;
        index++;
        apiUrl += `&itemFilter(${index}).name=HideDuplicateItems&itemFilter(${index}).value=true`;
        index++;
        let i = 0;
        if(newCondition){
        apiUrl += `&itemFilter(${index}).name=Condition&itemFilter(${index}).value(${i})=1000`;
            i++;
            }
        if(usedCondition){
            apiUrl += `&itemFilter(${index}).name=Condition&itemFilter(${index}).value(${i})=3000`;
            i++;
        }
        apiUrl += `&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo`;
        const headers = {
            'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced',
            'X-EBAY-SOA-SERVICE-VERSION': '1.0.0',
            'X-EBAY-SOA-SECURITY-APPNAME': 'SuchethG-Dummy-PRD-e7284ce84-7ac41448',
            'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
        }
        try{    
            const response = await axios.get(apiUrl,{headers});
            const data = response.data;
            globalData = data?.findItemsAdvancedResponse[0];
            res.json(data?.findItemsAdvancedResponse[0]);
        }catch(error){
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    })



    //get single item api
    app.get('/api/product-details',async (req,res)=>{
        const productId = req.query.itemId;
        const clientId = "SuchethG-Dummy-PRD-e7284ce84-7ac41448";
        const secretId = "PRD-f6db9fd35ab1-f85c-4dd3-96de-1f1d";
        const oauthToken = new OAuthToken(clientId, secretId);
        const accessToken = await oauthToken.getApplicationToken()
        .then(token => {
            return token;
            })
            .catch(error => {
                    console.error('Error:', error);
            });
       
        let apiUrl = `https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=${clientId}&siteid=0&version=967&ItemID=${productId}&IncludeSelector=Description,Details,ItemSpecifics`;
        
        const headers = {
            "X-EBAY-API-IAF-TOKEN": accessToken,
        }
        
        try {
            // Make the API request
            const response = await axios.get(apiUrl, { headers });
            const data = response.data;
            res.json(data);
        } catch (error) {
            console.error('API request error:', error);
            if (error.response) {
                console.error('API response status:', error.response.status);
                console.error('API response data:', error.response.data);
            }
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    })
    //get photo
    app.get('/api/photo',async (req,res)=>{
        title = req.query.title;
        let apiUrl = `https://www.googleapis.com/customsearch/v1?q=${title}&cx=42b01f234c65e4048&imgSize=huge&num=8&searchType=image&key=AIzaSyA2t6OcI9JAWNkmQE4EhmErUwajnuTf91E`;
        try{
            const response = await axios.get(apiUrl);
            const data = response.data;
            res.json(data);
        }catch(error){
            console.error(error)
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    })

    app.listen(port, () => {
        console.log(`Server is running on the port ${port}`)
    })

