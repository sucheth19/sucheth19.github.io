from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS 
import requests

app = Flask(__name__)
CORS(app)

@app.route('/getData', methods=['GET'])
def search_form():
    keyword = request.args.get('keywords')
    minValue = request.args.get('fromPrice')
    maxValue = request.args.get('toPrice')
    sort_order = request.args.get('sortBy')
    ReturnsAcceptedOnly = request.args.get('seller')
    FreeShippingOnly = request.args.get('shipFree')
    ExpeditedShippingType = request.args.get('shippingExpeditedCheckbox')
    news = request.args.get('news')
    used = request.args.get('used')
    veryGood = request.args.get('veryGood')
    good = request.args.get('good')
    acceptable = request.args.get('acceptable')

    print('keyword', keyword)
    print('minValue', minValue)
    print('maxValue', maxValue)
    print('sort_order', sort_order)
    print('ReturnsAcceptedOnly', ReturnsAcceptedOnly)
    print('FreeShippingOnly', FreeShippingOnly)
    print('ExpeditedShippingType', ExpeditedShippingType)
    print('news', news)
    print('used', used)
    print('veryGood', veryGood)
    print('good', good)
    print('acceptable', acceptable)

    initial_url = "https://svcs.eBay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=SuchethG-Dummy-PRD-e7284ce84-7ac41448&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD"

    initial_url += "&keywords=" + keyword
    
    if sort_order:
        initial_url += "&sortOrder=" + sort_order
    initial_url += "&paginationInput.entriesPerPage=100"
    if maxValue:
        initial_url += "&itemFilter(0).name=MaxPrice&itemFilter(0).value=" + maxValue+"&itemFilter(0).paramName=Currency&itemFilter(0).paramValue=USD"
    if minValue:
        initial_url += "&itemFilter(1).name=MinPrice&itemFilter(1).value=" + minValue
        initial_url += "&itemFilter(1).paramName=Currency&itemFilter(1).paramValue=USD"
    if ReturnsAcceptedOnly and ReturnsAcceptedOnly != 'None':
        initial_url += "&itemFilter(2).name=ReturnsAcceptedOnly&itemFilter(2).value=true"
    else:
        initial_url += "&itemFilter(2).name=ReturnsAcceptedOnly&itemFilter(2).value=false"
    if FreeShippingOnly and FreeShippingOnly != 'None':
        initial_url += "&itemFilter(3).name=FreeShippingOnly&itemFilter(3).value=true"
    else:
        initial_url += "&itemFilter(3).name=FreeShippingOnly&itemFilter(3).value=false"

    # if ExpeditedShippingType and ExpeditedShippingType != 'None':
    #     initial_url += "&itemFilter(4).name=ExpeditedShippingType&itemFilter(4).value=true"
    if news and news != 'None':
        initial_url += "&itemFilter(5).name=Condition&itemFilter(5).value=1000"

    if used and used != 'None':
        initial_url = initial_url+'&itemFilter(6).name=Condition&itemFilter(6).value=3000'
    if veryGood and veryGood != 'None':
        initial_url = initial_url+'&itemFilter(7).name=Condition&itemFilter(7).value=4000'
    if good and good != 'None':
        initial_url = initial_url+'&itemFilter(8).name=Condition&itemFilter(8).value=5000'
    if acceptable and acceptable != 'None':
        initial_url = initial_url+'&itemFilter(9).name=Condition&itemFilter(9).value=6000'

    print('url', initial_url)

    # Define the headers directly here
    headers = {
        'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced',
        'X-EBAY-SOA-SERVICE-VERSION': '1.0.0',
        'X-EBAY-SOA-SECURITY-APPNAME': 'SuchethG-Dummy-PRD-e7284ce84-7ac41448',
        'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
    }

    # Use initial_url in your request
    response = requests.get(initial_url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        search_result = data['findItemsAdvancedResponse'][0]
        print('search_result', search_result)
        return jsonify(search_result)
    else:
        return jsonify({'error': 'Failed to fetch data from eBay API'})

@app.route('/getSingleData', methods=['GET'])
def singleItem():
    pass
@app.route('/')
def index():
    return send_from_directory('static', 'index.html')
if __name__ == '__main__':
    app.run(debug=True)
