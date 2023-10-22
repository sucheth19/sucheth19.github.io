const express = require('express')
const app = express()
const axios = require('axios');
const port = 3000;
const cors = require('cors');
app.use(cors());

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
    const keyword = req.query.keyword;
    const apiUrl = `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SuchethG-Dummy-PRD-e7284ce84-7ac41448&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50&keywords=${keyword}&buyerPostalCode=90007`
    try{
        const response = await axios.get(apiUrl);
        const data = response.data;
        res.json(data?.findItemsAdvancedResponse[0]);
    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch data' });
    }
})


app.get('/ebay-search', async (req, res) => {
    try {
        const ebayApiUrl = 'https://svcs.ebay.com/services/search/FindingService/v1';
        const queryParams = {
            'OPERATION-NAME': 'findItemsAdvanced',
            'SERVICE-VERSION': '1.0.0',
            'SECURITY-APPNAME': 'SuchethG-Dummy-SBX-ff7296db9-398812de', // Replace with your eBay App ID
            'RESPONSE-DATA-FORMAT': 'JSON',
            'paginationInput.entriesPerPage': 50,
            'keywords': 'iphone',
            'buyerPostalCode': '90007',
            'itemFilter(0).name': 'MaxDistance',
            'itemFilter(0).value': 10,
            'itemFilter(1).name': 'FreeShippingOnly',
            'itemFilter(1).value': true,
            'itemFilter(2).name': 'LocalPickupOnly',
            'itemFilter(2).value': true,
            'itemFilter(3).name': 'HideDuplicateItems',
            'itemFilter(3).value': true,
            'itemFilter(4).name': 'Condition',
            'itemFilter(4).value(0)': 'New',
            'itemFilter(4).value(1)': 'Used',
            'itemFilter(4).value(2)': 'Unspecified',
            'outputSelector(0)': 'SellerInfo',
            'outputSelector(1)': 'StoreInfo',
        };
        const response = await axios.get(ebayApiUrl, {
            params: queryParams,
        });
        res.json(response.data);
        console.log('response', response.data)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
})
