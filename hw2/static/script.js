const globalData = {};
const globalResult = {};
const clearButton = document.getElementById('clearButton');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
var activeButton = 0;
// function showLessData() {
//     document.getElementById("showLessButton").style.display = "none";
//     document.getElementById('result').style.display = 'block';
//     document.getElementById("fdata").style.display = "block";
//     document.getElementById("response").style.display = "block";
//     document.getElementById("Dres").style.display = "none";
//     document.getElementsByClassName("line").style.display = "block";
//    activeButton = 1;
//     let tag1 = "";

//     if (
//         globalResult &&
//         globalResult['data'] &&
//         globalResult['data']['paginationOutput'] &&
//         globalResult['data']['paginationOutput'][0] &&
//         globalResult['data']['paginationOutput'][0]['totalEntries'] &&
//         globalResult['data']['paginationOutput'][0]['totalEntries'][0]){
//             const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
//             const totalResult = globalResult['data']['searchResult'][0]['@count'];
//             const data = globalResult['data']['searchResult'][0]['item'];
//             let minItems = Math.min(3, totalResult);
//             const header = document.getElementById('result');
//             const inputData = JSON.parse(globalData.values);
//             const keywords = inputData.keywords;
//             header.style.display = "block";
//             if(count>0){
//                 header.innerHTML = count + " Results found for " + keywords;
//                 for (let i = 0; i < minItems; i++) {
//                     const responseData = data[i]; 
//                     const title = responseData.title; 
//                     const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
//                     const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
//                     if (Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
//                         const shippingCost = parseFloat(shippingServiceCost[0].__value__);
//                         const price = currentPrice + shippingCost;
//                         tag1 += '<div class="card">';
//                         tag1 += '<table id="data-id" data-index="' + i + '"onclick="ClickData(this)">\n';
//                         tag1 += '<tr id="dataR">\n'; 
//                         tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
//                         tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '<tr>\n';
//                         tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '<tr>\n';
//                         tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + '</td>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '<tr>\n';
//                         tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '</table>\n';
//                         tag1 += '</div>';
//                     }else{
//                         tag1 += '<div class="card">';
//                         tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
//                         tag1 += '<tr id="dataR">\n'; 
//                         tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
//                         tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '<tr>\n';
//                         tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '<tr>\n';
//                         tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + '</td>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '<tr>\n';
//                         tag1 += '</tr>\n';
//                         tag1 += '</table>\n';
//                         tag1 += '</div>';
//                     }
//                 }
            
//                 document.getElementById("showMoreButton").style.display = "block";
//                 const responseDiv = document.getElementById('response');
//                 responseDiv.innerHTML = tag1;
//             }else{
//                 document.getElementById("Dres").style.display = "block";
//             }
//         }else{
            
//                 document.getElementById("Dres").style.display = "block";
            
//         }
  
  
    
// }
function showLessData() {
    document.getElementById("showLessButton").style.display = "none";
    document.getElementById('result').style.display = 'block';
    document.getElementById("fdata").style.display = "block";
    document.getElementById("response").style.display = "block";
    document.getElementById("Dres").style.display = "none";
    let tag1 = "";
    activeButton = 1;
    let count = 0;
    if (
        globalResult &&
        globalResult['data'] &&
        globalResult['data']['paginationOutput'] &&
        globalResult['data']['paginationOutput'][0] &&
        globalResult['data']['paginationOutput'][0]['totalEntries'] &&
        globalResult['data']['paginationOutput'][0]['totalEntries'][0]
    ) {
        console.log('global',globalResult)
        count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
        const totalResult = globalResult['data']['searchResult'][0]['@count'];
        const data = globalResult['data']['searchResult'][0]['item'];
        let minItems = Math.min(3, totalResult);
        const header = document.getElementById('result');
        const inputData = JSON.parse(globalData.values);
        const keywords = inputData.keywords;
        header.style.display = "block";

        if (count > 0) {
            header.innerHTML = count + " Results for " + keywords;
            for (let i = 0; i < minItems; i++) {
                const responseData = data[i];
                const title = responseData.title;
                const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
                const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;

                if (Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
                    const shippingCost = parseFloat(shippingServiceCost[0].__value__);
                    const price = currentPrice + shippingCost;
                    tag1 += '<div class="card">';
                    tag1 += '<table id="data-id" data-index="' + i + '"onclick="ClickData(this)">\n';
                    tag1 += '<tr id="dataR">\n';
                    tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
                    tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] +'<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/topRatedImage.png" style="height:20px;width:20px;"></a></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '</table>\n';
                    tag1 += '</div>';
                } else {
                    tag1 += '<div class="card">';
                    tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
                    tag1 += '<tr id="dataR">\n';
                    tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
                    tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + '</td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '</tr>\n';
                    tag1 += '</table>\n';
                    tag1 += '</div>';
                }
            }

            document.getElementById("showMoreButton").style.display = "block";
            const responseDiv = document.getElementById('response');
            responseDiv.innerHTML = tag1;
        } else {
            document.getElementById("Dres").style.display = "block";
        }
    } else {
        document.getElementById("Dres").style.display = "block";
    }
}

function showMoreData(){
    document.getElementById("showMoreButton").style.display = "none";
    document.getElementById('showLessButton').style.display = 'block';
    const responseDiv = document.getElementById('response');
    document.getElementById("Dres").style.display = "none";
    document.getElementsByClassName("line").style.display = "block";
    activeButton = 2;
    responseDiv.innerHTML = '';
    document.getElementById('result').style.display = 'block';
    document.getElementById("fdata").style.display = "block";
    document.getElementById("response").style.display = "block";
    let tag1 = "";
    const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
    console.log('count', count);
    const totalResult = globalResult['data']['searchResult'][0]['@count'];
    const data = globalResult['data']['searchResult'][0]['item'];
    let minItems = Math.min(10, totalResult);
    const header = document.getElementById('result');
    const inputData = JSON.parse(globalData.values);
    const keywords = inputData.keywords;
    header.style.display = "block";
    header.innerHTML = count + " Results for " + keywords;
    for (let i = 0; i < minItems; i++) {
        const responseData = data[i]; 
        const title = responseData.title; 
        const price = parseFloat(parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__) + parseFloat(responseData.shippingInfo[0].shippingServiceCost[0].__value__));
        tag1 += '<div class="card">';
        tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
        tag1 += '<tr id="dataR">\n'; 
        tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
        tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr>\n';
        tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr>\n';
        tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + '</td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr>\n';
        tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
        tag1 += '</tr>\n';
        tag1 += '</table>\n';
        tag1 += '</div>';
    }
    responseDiv.innerHTML = tag1;
    document.getElementById("showMoreButton").style.display = "none";
    document.getElementById("showLessButton").style.display = "block";
}
function ClickData(clickedElement){
    document.getElementById('result').style.display = 'none';
    document.getElementById("fdata").style.display = "none";
    document.getElementById("response").style.display = "none";
    document.getElementById("singleData").style.display = "block";
    document.getElementById("showMoreButton").style.display = "none";
    document.getElementById("showLessButton").style.display = "none";
    document.getElementById("itemDetails").style.display = "block";
    document.getElementById("singleResponse").style.display = "block";
    const dataIndex = clickedElement.getAttribute('data-index');
    const dataIndexNumber = parseInt(dataIndex);
    console.log(globalResult['data']['searchResult']);
    console.log("data",globalResult)
    const itemId = globalResult['data']['searchResult'][0]['item'][dataIndexNumber]['itemId'][0];
    console.log('itemId',itemId)
    const queryParams = [];

    if (itemId) {
        queryParams.push(`itemId=${encodeURIComponent(itemId)}`); 
    }
    const requestURL = `/getSingleData?${queryParams}`;

    fetch(requestURL).then(response => response.json()).then(data => {
        console.log("data",data)
        const pictureUrl = data['Item']['PictureURL'][0];
        const ebayLink = data['Item']['ViewItemURLForNaturalSearch'];
        const title = data['Item']['Title'];
        const price = data['Item']['CurrentPrice']['Value'];
        const location = data['Item']['Location']+","+data['Item']['PostalCode'];
        const seller = data['Item']['Seller']['UserID'];
        const returnPolicy = data['Item']['ReturnPolicy']['ReturnsAccepted']; 
        const itemSpecifics = data['Item']['ItemSpecifics']['NameValueList'];

        let tag1 = "";
        tag1 += '<table id="data-id" class="table-style">\n';
        tag1 += '<tr class="table-data">\n'; 
        tag1 += '<td class="table-data" ><strong>Photo</strong></td>\n';
        tag1 += '<td class="table-data" ><img src='+pictureUrl+' height="200px" width="200px">\n</td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data">\n';
        tag1 += '<td class="table-data" id="tdata"> <strong>eBay Link</strong> </td>\n';
        tag1 += '<td class="table-data"><a href='+ebayLink+'>eBay Product Link</a></td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data">\n';
        tag1 += '<td class="table-data" id="tdata"><strong>Title</strong></td>\n';
        tag1 += '<td class="table-data" >'+title+'</td>'
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data" >\n';
        tag1 += '<td class="table-data" ><strong>Price</strong></td>\n';
        tag1 += '<td class="table-data" >'+price+'</td>'
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data" >\n';
        tag1 += '<td class="table-data" ><strong>Location</strong></td>\n';
        tag1 += '<td class="table-data">'+location+'</td>'
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data">\n';
        tag1 += '<td class="table-data"><strong>Seller</strong></td>\n';
        tag1 += '<td class="table-data" >'+seller+'</td>'
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data">\n';
        tag1 += '<td class="table-data"><strong>Return Policy(US)</strong></td>\n';
        tag1 += '<td class="table-data">'+returnPolicy+'</td>'
        tag1 += '</tr>\n';
        for(let i=0;i<itemSpecifics.length;i++){
            tag1 += '<tr class="table-data">\n';
            tag1 += '<td class="table-data"><strong>'+itemSpecifics[i]['Name']+'</strong></td>\n';
            tag1 += '<td class="table-data">'+itemSpecifics[i]['Value'][0]+'</td>'
            tag1 += '</tr>\n';
        }
        tag1 += '</table>\n';
        document.getElementById("singleResponse").innerHTML = tag1;
    }).catch(error => {
     console.log('Error:', error)
    });

}
function previousResult(){
    document.getElementById("singleData").style.display = "none";
    document.getElementById("itemDetails").style.display = "none";
    if(activeButton==1){
        document.getElementById("showLessButton").style.display = "none";
        document.getElementById('result').style.display = 'block';
        document.getElementById("fdata").style.display = "block";
        document.getElementById("response").style.display = "block";
        document.getElementById("Dres").style.display = "none";
        let tag1 = "";
        const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
        const totalResult = globalResult['data']['searchResult'][0]['@count'];
        const data = globalResult['data']['searchResult'][0]['item'];
        let minItems = Math.min(3, totalResult);
        const header = document.getElementById('result');
        const inputData = JSON.parse(globalData.values);
        const keywords = inputData.keywords;
        header.style.display = "block";
        if(count>0){
            header.innerHTML = count + " Results for " + keywords;
            for (let i = 0; i < minItems; i++) {
                const responseData = data[i]; 
                const title = responseData.title; 
                const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
                const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
                if (Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
                    const shippingCost = parseFloat(shippingServiceCost[0].__value__);
                    const price = currentPrice + shippingCost;
                    tag1 += '<div class="card">';
                    tag1 += '<table id="data-id" data-index="' + i + '"onclick="ClickData(this)">\n';
                    tag1 += '<tr id="dataR">\n'; 
                    tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
                    tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + '</td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '</table>\n';
                    tag1 += '</div>';
                }else{
                    tag1 += '<div class="card">';
                    tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
                    tag1 += '<tr id="dataR">\n'; 
                    tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
                    tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + '</td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '</tr>\n';
                    tag1 += '</table>\n';
                    tag1 += '</div>';
                }
            }
        
            document.getElementById("showMoreButton").style.display = "block";
            const responseDiv = document.getElementById('response');
            responseDiv.innerHTML = tag1;
        }else{
            document.getElementById("Dres").style.display = "block";
        }
        
    }else{
        document.getElementById("showMoreButton").style.display = "none";
        document.getElementById('showLessButton').style.display = 'block';
        const responseDiv = document.getElementById('response');
        document.getElementById("Dres").style.display = "none";
        responseDiv.innerHTML = '';
        document.getElementById('result').style.display = 'block';
        document.getElementById("fdata").style.display = "block";
        document.getElementById("response").style.display = "block";
        let tag1 = "";
        const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
        console.log('count', count);
        const totalResult = globalResult['data']['searchResult'][0]['@count'];
        const data = globalResult['data']['searchResult'][0]['item'];
        let minItems = Math.min(10, totalResult);
        const header = document.getElementById('result');
        const inputData = JSON.parse(globalData.values);
        const keywords = inputData.keywords;
        header.style.display = "block";
        header.innerHTML = count + " Results for " + keywords;
        for (let i = 0; i < minItems; i++) {
            const responseData = data[i]; 
            const title = responseData.title; 
            const price = parseFloat(parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__) + parseFloat(responseData.shippingInfo[0].shippingServiceCost[0].__value__));
            tag1 += '<div class="card">';
            tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
            tag1 += '<tr id="dataR">\n'; 
            tag1 += '<td id="galleryUrl" rowspan="4">\n<img id="tbImg" src="' + responseData.galleryURL[0] + '" height="100" width="100">\n</td>\n';
            tag1 += '<td id="tdata"><b>' + title + '</b></td>\n';
            tag1 += '</tr>\n';
            tag1 += '<tr>\n';
            tag1 += '<td id="tdata">Category: ' + responseData.primaryCategory[0].categoryName[0] + '<a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;"></a></td>\n';
            tag1 += '</tr>\n';
            tag1 += '<tr>\n';
            tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + '</td>\n';
            tag1 += '</tr>\n';
            tag1 += '<tr>\n';
            tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
            tag1 += '</tr>\n';
            tag1 += '</table>\n';
            tag1 += '</div>';
        }
        responseDiv.innerHTML = tag1;
        document.getElementById("showMoreButton").style.display = "none";
        document.getElementById("showLessButton").style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const myForm = document.getElementById('myForm');
    function searchData(event){
        event.preventDefault();
        const keywords = document.getElementById('keywords').value.trim();
        console.log("keywords",keywords)
        let fromPrice = fromInput.value.trim() === '' ? 0 : parseFloat(fromInput.value);
        let toPrice = toInput.value.trim() === '' ? 0 : parseFloat(toInput.value);
        if(keywords===""){
            return false;
        }
        else if(fromPrice<0 || toPrice<0){
            alert("Price Range values cannot be negative! Please try a value greater than or equal to 0.0");
            return false;
        }
        else if(fromPrice>toPrice){
            alert("Oops! Lower price limit cannot be greater than upper price limit! Please try again.");
            return false;
            }

    const news = document.getElementById('new').checked===true?1000:0;
    const used = document.getElementById('used').checked===true?3000:0;
    const veryGood = document.getElementById('veryGood').checked===true?4000:0;
    const good = document.getElementById('good').checked===true?5000:0;
    const acceptable = document.getElementById('acceptable').checked===true?6000:0;
    const seller = document.getElementById('return').checked;
    const shipFree = document.getElementById('free').checked;
    const shippingExpeditedCheckbox = document.getElementById('expedited').checked;
    const sortBy = document.getElementById('category').value;
    const queryParams = [];

    if (keywords) {
            queryParams.push(`keywords=${encodeURIComponent(keywords)}`);
        }
    if(fromPrice===0){
        fromPrice = 0;
    }
    queryParams.push(`fromPrice=${fromPrice}`);
    if(toPrice===0){
        toPrice = 90000000;
       
    }
    queryParams.push(`toPrice=${toPrice}`);
    
    if (sortBy) {
            queryParams.push(`sortBy=${encodeURIComponent(sortBy)}`);
            }
    if(seller){
        queryParams.push(`seller=${encodeURIComponent(seller)}`);
    }
    if(shipFree){
        queryParams.push(`shipFree=${encodeURIComponent(shipFree)}`);
    }
    if(shippingExpeditedCheckbox){
        queryParams.push(`shippingExpeditedCheckbox=${encodeURIComponent(shippingExpeditedCheckbox)}`);
    }

    if(news>0){
        queryParams.push(`news=${encodeURIComponent(news)}`);
    }
    if(used>0){
        queryParams.push(`used=${encodeURIComponent(used)}`);
    }
    if(veryGood>0){
        queryParams.push(`veryGood=${encodeURIComponent(veryGood)}`);
    }
    if(good>0){
        queryParams.push(`good=${encodeURIComponent(good)}`);
    }
    if(acceptable>0){
        queryParams.push(`acceptable=${encodeURIComponent(acceptable)}`);
    }
    values = {
        keywords: keywords,
        fromPrice: fromPrice,
        toPrice: toPrice,
        sortBy: sortBy,
        seller: seller,
        shipFree: shipFree,
    }
    const queryString = queryParams.join('&');
    const requestURL = `/getData?${queryString}`;
    const jsonValues = JSON.stringify(values);
    globalData['values'] = jsonValues;
    fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let count = data["paginationOutput"][0]["totalEntries"][0]?data["paginationOutput"][0]["totalEntries"][0]:0;
            console.log('count',count)
            if(count==0){
                const fData = document.getElementById("fdata");
                fData.style.display = "none";
                const nData = document.getElementById("Dres");
                nData.style.display = "block";
                document.getElementById("Dres").style.display = "block";
            }else{
                const nData = document.getElementById("Dres");
                nData.style.display = "none";
                globalResult['data'] = data;
                showLessData();
                console.log('data',data)
            }
     })
      .catch(error => {
         console.error('Error:', error);  
         });
    }
    console.log('globalResult', globalResult)
    myForm.addEventListener('submit', searchData);
});

clearButton.addEventListener('click', function () {
document.getElementById('keywords').value = '';
document.getElementById('from').value = '';
document.getElementById('to').value = '';
document.getElementById('new').checked = false;
document.getElementById('used').checked = false;
document.getElementById('veryGood').checked = false;
document.getElementById('good').checked = false;
document.getElementById('acceptable').checked = false;
document.getElementById('return').checked = false;
document.getElementById('free').checked = false;
document.getElementById('expedited').checked = false;
document.getElementById('category').selectedIndex = 0;
document.getElementById('result').style.display = 'none';
document.getElementById('showMoreButton').style.display = 'none';
document.getElementById('showLessButton').style.display = 'none';
document.getElementById('response').style.display = 'none';
document.getElementById("Dres").style.display = "none";
document.getElementById("singleData").style.display = "none";
document.getElementById("itemDetails").style.display = "none";
document.getElementsByClassName("line").style.display = "none";

});
