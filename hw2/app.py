from flask import Flask, request, render_template, jsonify
from flask_cors import CORS 
import requests

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['GET'])
def search_form():
    keyword = request.args.get('keywords')
    minValue = request.args.get('fromPrice')
    maxValue = request.args.get('toPrice')
    sort_order = request.args.get('sortBy')
    # ReturnsAcceptedOnly = request.args.get('seller')
    # FreeShippingOnly = request.args.get('shipFree')
    # ExpeditedShippingType = request.args.get('shippingExpeditedCheckbox')
    # news = request.args.get('news')
    # used = request.args.get('used')
    # veryGood = request.args.get('veryGood')
    # good = request.args.get('good')
    # acceptable = request.args.get('acceptable')
    print('keyword', keyword)
    print('sort_order', sort_order)
    print('minValue', minValue)
    print('maxValue', maxValue)
    if keyword:
        api_url = 'https://svcs.eBay.com/services/search/FindingService/v1'
        operation_name = 'findItemsAdvanced'
        service_version = '1.0.0'
        app_name =  'SuchethG-Dummy-PRD-e7284ce84-7ac41448'
        response_format = 'JSON'
        headers = {
        'X-EBAY-SOA-OPERATION-NAME': operation_name,
        'X-EBAY-SOA-SERVICE-VERSION': service_version,
        'X-EBAY-SOA-SECURITY-APPNAME': app_name,
        'X-EBAY-SOA-RESPONSE-DATA-FORMAT': response_format,
            }
        # condition_values = []
        # if news and news != 'None':
        #     condition_values.append(1000)
        # if used and used != 'None':
        #     condition_values.append(3000)
        # if veryGood and veryGood != 'None':
        #     condition_values.append(4000)
        # if good and good != 'None':
        #     condition_values.append(5000)
        # if acceptable and acceptable != 'None':
        #     condition_values.append(6000)
        # item_filters = []

        # for idx, value in enumerate(condition_values):
        #     item_filter_name = f'itemFilter({idx}).name'
        #     item_filter_value = f'itemFilter({idx}).value'
        #     item_filters.extend([(item_filter_name, 'Condition'), (item_filter_value, value)])

        params = {
            'keywords': keyword,
            'paginationInput.entriesPerPage': '100',
            'sortOrder': sort_order,
            # 'itemFilter(0).name': 'MaxPrice',
            # 'itemFilter(0).value': maxValue,
            # 'itemFilter(0).paramName': 'Currency',
            # 'itemFilter(0).paramValue': 'USD',
            # 'itemFilter(1).name': 'MinPrice',
            # 'itemFilter(1).value': minValue,
            # 'itemFilter(1).paramName': 'Currency',
            # 'itemFilter(1).paramValue': 'USD',
            # 'itemFilter(2).name': 'ReturnsAcceptedOnly',
            # 'itemFilter(2).value': ReturnsAcceptedOnly,
            # 'itemFilter(3).name': 'FreeShippingOnly',
            # 'itemFilter(3).value': FreeShippingOnly,
            # 'itemFilter(4).name': 'ExpeditedShippingType',
            # 'itemFilter(4).value': ExpeditedShippingType
        }
        # params.update(item_filters)
        response = requests.get(api_url, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()
            search_result = data['findItemsAdvancedResponse'][0]
            print('search_result', search_result)
            return jsonify(search_result)
        else:
            return jsonify({'error': 'Failed to fetch data from eBay API'})
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
