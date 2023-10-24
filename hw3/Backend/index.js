const  OAuthToken= require('./ebay_oauth_token');
const express = require('express')
const app = express()
const axios = require('axios');
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());


mongoose.connect('mongodb://localhost:27017/wishlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/products',(req,res)=>{
    console.log('success');
})


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

app.get('/api/search-results',async (req,res)=>{
    const searchParams = JSON.parse(req.query.searchParams); 
    const keyword = searchParams.keyword;
    const category = searchParams.category;
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
        res.json(data?.findItemsAdvancedResponse[0]);
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch data' });
    }
})



const getEbayAccessToken = async ()=>{
    const clientId = 'SuchethG-Dummy-SBX-ff7296db9-398812de';
    const client_secret = 'SBX-f7296db95416-9849-4244-813c-469a';
    const oauthToken = new OAuthToken(clientId, client_secret);
    oauthToken.getApplicationToken().then((accessToken)=>{
        console.log('Access Token',accessToken);
    }).catch((error)=>{ 
        console.log(error);
    });
}




app.get('/api/product-details',async (req,res)=>{
    const productId = req.query.productId;
    const accessToken = await getEbayAccessToken();
    console.log('access',accessToken)
    const headers = {
        "X-EBAY-API-IAF-TOKEN": accessToken,
    }
    let apiUrl = `https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=SuchethG-Dummy-PRD-e7284ce84-7ac41448&siteid=0&version=967&ItemID=132961484706&IncludeSelector=Description,Details,ItemSpecifics`;
    try{
        const response = await axios.get(apiUrl,{headers});
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

