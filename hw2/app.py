from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
from ebay_oauth_token import OAuthToken

app = Flask(__name__)
CORS(app)

# @app.route('/getData', methods=['GET'])
# def search_form():
#     keyword = request.args.get('keywords')
#     minValue = request.args.get('fromPrice')
#     maxValue = request.args.get('toPrice')
#     sort_order = request.args.get('sortBy')
#     FreeShippingOnly = request.args.get('shipFree')
#     ExpeditedShippingType = request.args.get('shippingExpeditedCheckbox')
#     news = request.args.get('news')
#     used = request.args.get('used')
#     veryGood = request.args.get('veryGood')
#     good = request.args.get('good')
#     acceptable = request.args.get('acceptable')
    
#     if keyword is None:
#         return jsonify({'error': 'Missing required parameter: keywords'})

#     initial_url = "https://svcs.eBay.com/services/search/FindingService/v1"
#     initial_url += "?OPERATION-NAME=findItemsAdvanced"
#     initial_url += "&SERVICE-VERSION=1.0.0"
#     initial_url += "&SECURITY-APPNAME=SuchethG-Dummy-PRD-e7284ce84-7ac41448"
#     initial_url += "&RESPONSE-DATA-FORMAT=JSON"
#     initial_url += "&REST-PAYLOAD"
#     initial_url += "&keywords=" + keyword

#     item_filter_index = 0  # Initialize the item filter index

#     if sort_order:
#         initial_url += "&sortOrder=" + sort_order

#     initial_url += "&paginationInput.entriesPerPage=100"

#     # Price range filters
#     if maxValue:
#         initial_url += f"&itemFilter({item_filter_index}).name=MaxPrice&itemFilter({item_filter_index}).value={maxValue}&itemFilter({item_filter_index}).paramName=Currency&itemFilter({item_filter_index}).paramValue=USD"
#         item_filter_index += 1
#     if minValue:
#         initial_url += f"&itemFilter({item_filter_index}).name=MinPrice&itemFilter({item_filter_index}).value={minValue}&itemFilter({item_filter_index}).paramName=Currency&itemFilter({item_filter_index}).paramValue=USD"
#         item_filter_index += 1

#     # Shipping filters
#     if FreeShippingOnly and FreeShippingOnly != 'None':
#         initial_url += f"&itemFilter({item_filter_index}).name=FreeShippingOnly&itemFilter({item_filter_index}).value=true"
#         item_filter_index += 1
#     else:
#         initial_url += f"&itemFilter({item_filter_index}).name=FreeShippingOnly&itemFilter({item_filter_index}).value=false"
#         item_filter_index += 1

#     if ExpeditedShippingType and ExpeditedShippingType != 'None':
#         initial_url += f"&itemFilter({item_filter_index}).name=ExpeditedShippingType&itemFilter({item_filter_index}).value=true"
#         item_filter_index += 1

#     cond = 0

#     if news and news != 'None':
#         initial_url += f"&itemFilter({index}).name=Condition&itemFilter({index}).value({cond})=1000"
#         cond += 1
#     else:
#         initial_url += f"&itemFilter({index}).name=Condition"

#     if used and used != 'None':
#         initial_url += f"&itemFilter({index}).value({cond})=3000"
#         cond += 1

#     if veryGood and veryGood != 'None':
#         initial_url += f"&itemFilter({index}).value({cond})=4000"
#         cond += 1

#     if good and good != 'None':
#         initial_url += f"&itemFilter({index}).value({cond})=5000"
#         cond += 1

#     if acceptable and acceptable != 'None':
#         initial_url += f"&itemFilter({index}).value({cond})=6000"
#         cond += 1

#     headers = {
#         'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced',
#         'X-EBAY-SOA-SERVICE-VERSION': '1.0.0',
#         'X-EBAY-SOA-SECURITY-APPNAME': 'SuchethG-Dummy-PRD-e7284ce84-7ac41448',
#         'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
#     }

#     response = requests.get(initial_url, headers=headers)
#     print('response',response)
#     if response.status_code == 200:
#         data = response.json()
#         search_result = data['findItemsAdvancedResponse'][0]
#         return jsonify(search_result)

#     return jsonify({'error': 'Failed to fetch data from eBay API'})

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
        

        #sAMPLE URL FOR SUCHETH G

        #https://svcs.eBay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SuchethG-Dummy-PRD-e7284ce84-7ac41448&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=iphone&sortOrder=BestMatch&paginationInput.entriesPerPage=100&itemFilter(0).name=MaxPrice&itemFilter(0).value=1000&itemFilter(0).paramName=Currency&itemFilter(0).paramValue=USD&itemFilter(1).name=MinPrice&itemFilter(1).value=15&itemFilter(1).paramName=Currency&itemFilter(1).paramValue=USD&itemFilter(2).name=FreeShippingOnly&itemFilter(2).value=true&itemFilter(3).name=Condition&itemFilter(3).value(0)=1000&itemFilter(3).value(1)=3000

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
    if not itemId:
        return jsonify({'error': 'itemId is required'})

    client_id = "SuchethG-Dummy-PRD-e7284ce84-7ac41448"
    client_secret = "PRD-7284ce847c74-ea21-43bc-827c-7701"
    oauth_utility = OAuthToken(client_id, client_secret)
    application_token = oauth_utility.getApplicationToken()
    headers = {
        "X-EBAY-API-IAF-TOKEN": oauth_utility.getApplicationToken()
    }

    api_url = 'https://open.api.ebay.com/shopping'
    params = {
        'callname': 'GetSingleItem',
        'responseencoding': 'JSON',
        'appid': client_id,
        'IncludeSelector': 'Description,Details,ItemSpecifics',
        'siteid': 0,
        'version': 967,
        'ItemID': itemId
    }

    response = requests.get(api_url, params=params, headers=headers)
    if response.status_code == 200:
        api_data = response.json()
        return jsonify(api_data)

    return jsonify({'error': 'Failed to fetch data from eBay Shopping API'})

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
