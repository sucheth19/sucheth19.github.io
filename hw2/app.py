from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
from ebay_oauth_token import OAuthToken
import os

app = Flask(__name__)
CORS(app)

# Configuration - Set your eBay API credentials here
EBAY_API_APP_ID = os.getenv('EBAY_API_APP_ID', 'YourAppIDHere')
EBAY_API_APP_SECRET = os.getenv('EBAY_API_APP_SECRET', 'YourAppSecretHere')

def get_ebay_application_token():
    oauth_utility = OAuthToken(EBAY_API_APP_ID, EBAY_API_APP_SECRET)
    return oauth_utility.getApplicationToken()

def build_ebay_headers():
    return {
        "X-EBAY-API-IAF-TOKEN": get_ebay_application_token()
    }

@app.route('/getData', methods=['GET'])
def search_form():
    keyword = request.args.get('keywords')
    minValue = request.args.get('fromPrice')
    maxValue = request.args.get('toPrice')
    sort_order = request.args.get('sortBy')
    FreeShippingOnly = request.args.get('shipFree')
    ExpeditedShippingType = request.args.get('shippingExpeditedCheckbox')
    news = request.args.get('news')
    used = request.args.get('used')
    veryGood = request.args.get('veryGood')
    good = request.args.get('good')
    acceptable = request.args.get('acceptable')
    
    if keyword is None:
        return jsonify({'error': 'Missing required parameter: keywords'})

    initial_url = "https://svcs.eBay.com/services/search/FindingService/v1"
    initial_url += "?OPERATION-NAME=findItemsAdvanced"
    initial_url += "&SERVICE-VERSION=1.0.0"
    initial_url += "&SECURITY-APPNAME=SuchethG-Dummy-PRD-e7284ce84-7ac41448"
    initial_url += "&RESPONSE-DATA-FORMAT=JSON"
    initial_url += "&REST-PAYLOAD"
    initial_url += "&keywords=" + keyword

    item_filter_index = 0  # Initialize the item filter index

    if sort_order:
        initial_url += "&sortOrder=" + sort_order

    initial_url += "&paginationInput.entriesPerPage=100"

    if maxValue:
        initial_url += f"&itemFilter({item_filter_index}).name=MaxPrice&itemFilter({item_filter_index}).value={maxValue}&itemFilter({item_filter_index}).paramName=Currency&itemFilter({item_filter_index}).paramValue=USD"
        item_filter_index += 1
    
    if minValue:
        initial_url += f"&itemFilter({item_filter_index}).name=MinPrice&itemFilter({item_filter_index}).value={minValue}&itemFilter({item_filter_index}).paramName=Currency&itemFilter({item_filter_index}).paramValue=USD"
        item_filter_index += 1

    if FreeShippingOnly and FreeShippingOnly != 'None':
        initial_url += f"&itemFilter({item_filter_index}).name=FreeShippingOnly&itemFilter({item_filter_index}).value=true"
        item_filter_index += 1
    else:
        initial_url += f"&itemFilter({item_filter_index}).name=FreeShippingOnly&itemFilter({item_filter_index}).value=false"
        item_filter_index += 1

    if ExpeditedShippingType and ExpeditedShippingType != 'None':
        initial_url += f"&itemFilter({item_filter_index}).name=ExpeditedShippingType&itemFilter({item_filter_index}).value=true"
        item_filter_index += 1

    cond_index = 0
    condition = []
    if news and news != 'None':
        condition.append("1000")
    if used and used != 'None':
        condition.append("3000")
    if veryGood and veryGood != 'None':
        condition.append("4000")
    if good and good != 'None':
        condition.append("5000")
    if acceptable and acceptable != 'None':
        condition.append("6000")
    if len(condition) > 0:
        initial_url += f"&itemFilter({item_filter_index}).name=Condition"
        for i in range(len(condition)):
            initial_url += f"&itemFilter({item_filter_index}).value({cond_index})={condition[i]}"
            cond_index += 1

    headers = {
        'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced',
        'X-EBAY-SOA-SERVICE-VERSION': '1.0.0',
        'X-EBAY-SOA-SECURITY-APPNAME': 'SuchethG-Dummy-PRD-e7284ce84-7ac41448',
        'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
    }

    response = requests.get(initial_url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        search_result = data.get('findItemsAdvancedResponse', [{}])[0]
        return jsonify(search_result)
    
    return jsonify({'error': 'Failed to fetch data from eBay API'})

@app.route('/getSingleData', methods=['GET'])
def singleItem():
    itemId = request.args.get('itemId')
    print('itemId', itemId)
    if not itemId:
        return jsonify({'error': 'itemId is required'})

    client_id = "SuchethG-Dummy-PRD-e7284ce84-7ac41448"

    # Create an instance of OAuthToken with your actual eBay API credentials
    oauth_token = OAuthToken(client_id,"PRD-f6db9fd35ab1-f85c-4dd3-96de-1f1d")

    # Get the application token
    access_token = oauth_token.getApplicationToken()

    # Construct the correct API URL
    api_url = f"https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid={client_id}&siteid=0&version=967&ItemID={itemId}&IncludeSelector=Description,Details,ItemSpecifics"
    print('api', api_url)
    headers = {
        "X-EBAY-API-IAF-TOKEN": access_token  # Use the obtained access_token here
    }

    response = requests.get(api_url, headers=headers)
    print(response.json())
    print('api', api_url)
    if response.status_code == 200:
        api_data = response.json()
        return jsonify(api_data)

    return jsonify({'error': 'Failed to fetch data from eBay Shopping API'})


@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)