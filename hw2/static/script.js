const globalData = {};
const globalResult = {};
const clearButton = document.getElementById('clearButton');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
var activeButton = 0;
let responseData = {};

function showLessData() {
    document.getElementById("showLessButton").style.display = "none";
    document.getElementById("showMoreButton").style.display = "none";
    document.getElementById('result').style.display = 'block';
    document.getElementById("fdata").style.display = "block";
    document.getElementById("response").style.display = "block";
    document.getElementById("Dres").style.display = "none";
    document.getElementById("line").style.display = "block";
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
        const totalEntries = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
        const totalResult = globalResult['data']['searchResult'][0]['@count'];
        const data = globalResult['data']['searchResult'][0]['item'];
        let minItems = Math.min(3, totalResult);
        const header = document.getElementById('result');
        const inputData = JSON.parse(globalData.values);
        const keywords = inputData.keywords;
        header.style.display = "block";
        let defaultImageURL = "https://csci571.com/hw/hw6/images/ebay_default.jpg"; 
        if (totalResult > 0) {
            header.innerHTML = totalEntries + " Results found for " + "<em>" + keywords + "</em>";
            console.log('globalResult', globalResult)
            for (let i = 0; i < minItems; i++) {
                 responseData = data[i];
                 
                const title = responseData.title;
                const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
                const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
                let shippingCost = 0; 

                if (shippingServiceCost && Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
                    shippingCost = parseFloat(shippingServiceCost[0].__value__) || 0;
                }

                    let price = currentPrice;
                    if (shippingCost > 0) {
                        price = currentPrice + " ( + $" + shippingCost + " for shipping)";
                    }
                    defaultImageURL = responseData.galleryURL[0] ? responseData.galleryURL[0] : defaultImageURL; 

                    let condition = ''; 

                    if (responseData.condition && responseData.condition[0] && responseData.condition[0].conditionDisplayName) {
                        condition = responseData.condition[0].conditionDisplayName[0] || '';
                    }

                    const topRatedImage = responseData.topRatedListing[0]=== 'true' ? '<img id="topRatedImage" src="https://csci571.com/hw/hw6/images/topRatedImage.png" style="height:30px;width:30px;">' : '';
                    console.log(title,responseData.topRatedListing[0],topRatedImage)
                    tag1 += '<div class="card">';
                    tag1 += '<table id="data-id" data-index="' + i + '"onclick="ClickData(this)">\n';
                    tag1 += '<tr id="dataR">\n';
                    tag1 += '<td id="galleryUrl" rowspan="4" style="min-height: 100px;">\n';
                    tag1 += '<div class="image-container">';
                    tag1 += '<img id="tbImg" src="' + defaultImageURL+ '" height="100" width="100" ></div></td>';
                    tag1 += '<td id="tdata" class="truncate-text"><b>' + title + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    if( responseData.primaryCategory[0] &&responseData.primaryCategory[0].categoryName[0]){
                    tag1 += '<td id="tdata">Category: <em>' + responseData.primaryCategory[0].categoryName[0] + '</em><a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;" onclick="stopPropagation(event);"></a></td>\n';
                    }
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    if(condition){
                        tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + condition + topRatedImage + '</td>\n';
                    }
                    tag1 += '</tr>\n';
                    tag1 += '<tr>\n';
                    tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
                    tag1 += '</tr>\n';
                    tag1 += '</table>\n';
                    tag1 += '</div>';
            }
        
            if (totalResult > 3) {
                document.getElementById("showMoreButton").style.display = "block";
            }
            const responseDiv = document.getElementById('response');
            responseDiv.innerHTML = tag1;
        } else {
            document.getElementById("Dres").style.display = "block";
        }
    } else {
        document.getElementById("Dres").style.display = "block";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function stopPropagation(event) {
    event.stopPropagation();
}
function showMoreData(){
    document.getElementById("showMoreButton").style.display = "none";
    document.getElementById('showLessButton').style.display = 'block';
    document.getElementById("Dres").style.display = "none";
    activeButton = 2;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';
    document.getElementById('result').style.display = 'block';
    document.getElementById("fdata").style.display = "block";
    document.getElementById("response").style.display = "block";
    let tag1 = "";
    const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
    const totalResult = globalResult['data']['searchResult'][0]['@count'];
    let minItems = Math.min(10, totalResult);
    const header = document.getElementById('result');
    const inputData = JSON.parse(globalData.values);
    const keywords = inputData.keywords;
    header.style.display = "block";
    header.innerHTML = count + " Results found for " + "<em>" + keywords + "</em>";
    const data = globalResult['data']['searchResult'][0]['item'];

    for (let i = 0; i < minItems; i++) {
        responseData = data[i];
        const title = responseData.title;
        let price = 0;
        
        if (
            responseData.sellingStatus &&
            responseData.sellingStatus[0] &&
            responseData.sellingStatus[0].currentPrice &&
            responseData.sellingStatus[0].currentPrice[0] &&
            responseData.sellingStatus[0].currentPrice[0].__value__
        ) {
            price = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
        }
        
        
        const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
        if (Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
            let shippingCost = parseFloat(shippingServiceCost[0].__value__);
            price += shippingCost; 
        }
        let condition = ""; 

        if (
            responseData.condition &&
            responseData.condition[0] &&
            responseData.condition[0].conditionDisplayName &&
            responseData.condition[0].conditionDisplayName[0]
            ) {
            condition = responseData.condition[0].conditionDisplayName[0];
            }

            const topRatedImage = responseData.topRatedListing[0] === 'true'? '<img id="topRatedImage" src="https://csci571.com/hw/hw6/images/topRatedImage.png" style="height:30px;width:30px;">' : '';
        const defaultImageURL = responseData.galleryURL[0] ? responseData.galleryURL[0] : "https://csci571.com/hw/hw6/images/ebay_default.jpg";

        tag1 += '<div class="card">';
        tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
        tag1 += '<tr id="dataR">\n';
        tag1 += '<td id="galleryUrl" rowspan="4" style="min-height: 100px;">\n';
        tag1 += '<div class="image-container">';
        tag1 += '<img id="tbImg" src="' + defaultImageURL+ '" height="100" width="100" ></div></td>';
        tag1 += '<td id="tdata" class="truncate-text"><b>' + title + '</b></td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr>\n';
        if(responseData.primaryCategory[0] && responseData.primaryCategory[0].categoryName[0]){
        tag1 += '<td id="tdata">Category: <em>' + responseData.primaryCategory[0].categoryName[0] + '</em><a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;" onclick="stopPropagation(event);"></a></td>\n';
        }
        tag1 += '</tr>\n';
        tag1 += '<tr>\n';
        if(condition){
            tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + condition + topRatedImage + '</td>\n';
        }
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
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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

    const itemId = globalResult['data']['searchResult'][0]['item'][dataIndexNumber]['itemId'][0];
   
    const queryParams = [];

    if (itemId) {
        queryParams.push(`itemId=${encodeURIComponent(itemId)}`); 
    }
    const requestURL = `/getSingleData?${queryParams}`;

    fetch(requestURL).then(response => response.json()).then(data => {
     
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
        tag1 += '<td class="table-data" ><img src='+pictureUrl+' style="height:200px;">\n</td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data">\n';
        tag1 += '<td class="table-data" > <strong>eBay Link</strong> </td>\n';
        tag1 += '<td class="table-data"><a href='+ebayLink+' target="_blank">eBay Product Link</a></td>\n';
        tag1 += '</tr>\n';
        tag1 += '<tr class="table-data">\n';
        tag1 += '<td class="table-data" ><strong>Title</strong></td>\n';
        tag1 += '<td class="table-data">'+title+'</td>'
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
// function previousResult(){
//     document.getElementById("singleData").style.display = "none";
//     document.getElementById("itemDetails").style.display = "none";
//     if(activeButton==1){
//         document.getElementById("showLessButton").style.display = "none";
//         document.getElementById("showMoreButton").style.display = "none";
//         document.getElementById('result').style.display = 'block';
//         document.getElementById("fdata").style.display = "block";
//         document.getElementById("response").style.display = "block";
//         document.getElementById("Dres").style.display = "none";
//         let tag1 = "";
//         const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
//         const totalResult = globalResult['data']['searchResult'][0]['@count'];
//         const data = globalResult['data']['searchResult'][0]['item'];
//         let minItems = Math.min(3, totalResult);
//         const header = document.getElementById('result');
//         const inputData = JSON.parse(globalData.values);
//         const keywords = inputData.keywords;
//         header.style.display = "block";

//         if(totalResult>0){
//             header.innerHTML = count + " Results found for " +"<em>"+keywords+"</em>";
//             for (let i = 0; i < minItems; i++) {
//                 const responseData = data[i]; 
//                 const title = responseData.title; 
//                 const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
//                 const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
//                 const defaultImageURL = responseData.galleryURL[0] ? responseData.galleryURL[0] : "https://csci571.com/hw/hw6/images/ebay_default.jpg";
//                 let shippingCost = 0;
//                 if (shippingServiceCost && Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
//                     shippingCost = parseFloat(shippingServiceCost[0].__value__) || 0;
//                 }
                   
//                 let price = currentPrice;
//                 if (shippingCost > 0) {
//                     price = currentPrice + " ( + $" + shippingCost + " for shipping)";
//                 }
//                 let condition = '';

//                 if (responseData.condition && responseData.condition[0] && responseData.condition[0].conditionDisplayName) {
//                     condition = responseData.condition[0].conditionDisplayName[0] || '';
//                 }
                
//                 const topRatedImage = responseData.topRatedListing[0] === 'true' ? '<img id="topRatedImage" src="https://csci571.com/hw/hw6/images/topRatedImage.png" style="height:30px;width:30px;">' : '';
//                     tag1 += '<table id="data-id" data-index="' + i + '"onclick="ClickData(this)">\n';
//                     tag1 += '<tr id="dataR">\n'; 
//                     tag1 += '<td id="galleryUrl" rowspan="4" style="min-height: 100px;">\n';
//                     tag1 += '<div class="image-container">';
//                     tag1 += '<img id="tbImg" src="' + defaultImageURL+ '" height="100" width="100" ></div></td>';
//                     tag1 += '<td id="tdata" class="truncate-text"><b>' + title + '</b></td>\n';
//                     tag1 += '</tr>\n';
//                     tag1 += '<tr>\n';
//                     if(responseData.primaryCategory[0] && responseData.primaryCategory[0].categoryName[0]){
//                     tag1 += '<td id="tdata">Category: <em>' + responseData.primaryCategory[0].categoryName[0] + '</em><a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;" onclick="stopPropagation(event);"></a></td>\n';
//                     }
//                     tag1 += '</tr>\n';
//                     tag1 += '<tr>\n';
//                     if(condition){
//                     tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0]+ topRatedImage + '</td>\n';
//                     }
//                     tag1 += '</tr>\n';
//                     tag1 += '<tr>\n';
//                     tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
//                     tag1 += '</tr>\n';
//                     tag1 += '</table>\n';
//                     tag1 += '</div>';
                  
                
//             }
//             if(totalResult>3){
//                 document.getElementById("showMoreButton").style.display = "block";
//             }
//             const responseDiv = document.getElementById('response');
//             responseDiv.innerHTML = tag1;
//         }else{
//             document.getElementById("Dres").style.display = "block";
//         }
//     }else{
//         document.getElementById("showMoreButton").style.display = "none";
//         document.getElementById('showLessButton').style.display = "none";
//         const responseDiv = document.getElementById('response');
//         document.getElementById("Dres").style.display = "none";
//         responseDiv.innerHTML = '';
//         document.getElementById('result').style.display = 'block';
//         document.getElementById("fdata").style.display = "block";
//         document.getElementById("response").style.display = "block";
//         let tag1 = "";
//         const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
//         const totalResult = globalResult['data']['searchResult'][0]['@count'];
//         const data = globalResult['data']['searchResult'][0]['item'];
//         let minItems = Math.min(10, totalResult);
//         const header = document.getElementById('result');
//         const inputData = JSON.parse(globalData.values);
//         const keywords = inputData.keywords;
//         header.style.display = "block";
//         header.innerHTML = count + " Results found for " +"<em>"+keywords+"</em>";
//         for (let i = 0; i < minItems; i++) {
//             responseData = data[i]; 
//             const title = responseData.title; 
//             const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
//             const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
//             const defaultImageURL = responseData.galleryURL[0] ? responseData.galleryURL[0] : "https://csci571.com/hw/hw6/images/ebay_default.jpg";
//             let shippingCost = 0;
//             if (shippingServiceCost && Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
//                 shippingCost = parseFloat(shippingServiceCost[0].__value__) || 0;
//             }
               
//             let price = currentPrice;
//             if (shippingCost > 0) {
//                 price = currentPrice + " ( + $" + shippingCost + " for shipping)";
//             }
//             let condition = '';

//             if (responseData.condition && responseData.condition[0] && responseData.condition[0].conditionDisplayName) {
//                 condition = responseData.condition[0].conditionDisplayName[0] || '';
//             }
        
//             const topRatedImage = responseData.topRatedListing[0] === 'true' ? '<img id="topRatedImage" src="https://csci571.com/hw/hw6/images/topRatedImage.png" style="height:30px;width:30px;">' : '';
        
//             tag1 += '<div class="card">';
//             tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
//             tag1 += '<tr id="dataR">\n'; 
//             tag1 += '<td id="galleryUrl" rowspan="4" style="min-height: 100px;">\n';
//             tag1 += '<div class="image-container">';
//             tag1 += '<img id="tbImg" src="' + defaultImageURL+ '" height="100" width="100" ></div></td>';
//             tag1 += '<div class="image-container">';
//             tag1 += '<img id="tbImg" src="' + defaultImageURL+ '" height="100" width="100" ></div></td>';
//             tag1 += '<td id="tdata" class="truncate-text"><b>' + title + '</b></td>\n';
//             tag1 += '</tr>\n';
//             tag1 += '<tr>\n';
//             if(responseData.primaryCategory[0] && responseData.primaryCategory[0].categoryName[0]){
//             tag1 += '<td id="tdata">Category: <em>' + responseData.primaryCategory[0].categoryName[0] + '</em><a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;" onclick="stopPropagation(event);"></a></td>\n';
//             }
//             tag1 += '</tr>\n';
//             tag1 += '<tr>\n';
//             if(condition){
//             tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] +topRatedImage+ '</td>\n';
//             }
//             tag1 += '</tr>\n';
//             tag1 += '<tr>\n';
//             tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
//             tag1 += '</tr>\n';
//             tag1 += '</table>\n';
//             tag1 += '</div>';
//         }
//         responseDiv.innerHTML = tag1;
//         if(totalResult>3){
//             document.getElementById("showLessButton").style.display = "block";document.getElementById("showLessButton").style.display = "block";
//         }
        
//     }
// }
function previousResult() {
    document.getElementById("singleData").style.display = "none";
    document.getElementById("itemDetails").style.display = "none";

    if (activeButton === 1) {
        // This section is for the "Show Less" button behavior
        document.getElementById("showLessButton").style.display = "none";
        document.getElementById("showMoreButton").style.display = "block";
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

        if (totalResult > 0) {
            header.innerHTML = count + " Results found for " + "<em>" + keywords + "</em>";
            for (let i = 0; i < minItems; i++) {
                const responseData = data[i];
                const title = responseData.title;
                const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
                const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
                const defaultImageURL = responseData.galleryURL[0] ? responseData.galleryURL[0] : "https://csci571.com/hw/hw6/images/ebay_default.jpg";
                let shippingCost = 0;
                if (shippingServiceCost && Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
                    shippingCost = parseFloat(shippingServiceCost[0].__value__) || 0;
                }

                let price = currentPrice;
                if (shippingCost > 0) {
                    price = currentPrice + " ( + $" + shippingCost + " for shipping)";
                }
                let condition = '';

                if (responseData.condition && responseData.condition[0] && responseData.condition[0].conditionDisplayName) {
                    condition = responseData.condition[0].conditionDisplayName[0] || '';
                }

                const topRatedImage = responseData.topRatedListing[0] === 'true' ? '<img id="topRatedImage" src="https://csci571.com/hw/hw6/images/topRatedImage.png" style="height:30px;width:30px;">' : '';
                tag1 += '<div class="card">';
                tag1 += '<table id="data-id" data-index="' + i + '"onclick="ClickData(this)">\n';
                tag1 += '<tr id="dataR">\n';
                tag1 += '<td id="galleryUrl" rowspan="4" style="min-height: 100px;">\n';
                tag1 += '<div class="image-container">';
                tag1 += '<img id="tbImg" src="' + defaultImageURL + '" height="100" width="100" ></div></td>';
                tag1 += '<td id="tdata" class="truncate-text"><b>' + title + '</b></td>\n';
                tag1 += '</tr>\n';
                tag1 += '<tr>\n';
                if (responseData.primaryCategory[0] && responseData.primaryCategory[0].categoryName[0]) {
                    tag1 += '<td id="tdata">Category: <em>' + responseData.primaryCategory[0].categoryName[0] + '</em><a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;" onclick="stopPropagation(event);"></a></td>\n';
                }
                tag1 += '</tr>\n';
                tag1 += '<tr>\n';
                if (condition) {
                    tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + topRatedImage + '</td>\n';
                }
                tag1 += '</tr>\n';
                tag1 += '<tr>\n';
                tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
                tag1 += '</tr>\n';
                tag1 += '</table>\n';
                tag1 += '</div>';
            }
            if (totalResult > 3) {
                document.getElementById("showMoreButton").style.display = "block";
            }
            const responseDiv = document.getElementById('response');
            responseDiv.innerHTML = tag1;
        } else {
            document.getElementById("Dres").style.display = "block";
        }
    } else {
        // This section is for the "Show More" button behavior
        document.getElementById("showMoreButton").style.display = "none";
        document.getElementById('showLessButton').style.display = "none";
        const responseDiv = document.getElementById('response');
        document.getElementById("Dres").style.display = "none";
        responseDiv.innerHTML = '';
        document.getElementById('result').style.display = 'block';
        document.getElementById("fdata").style.display = "block";
        document.getElementById("response").style.display = "block";
        let tag1 = "";
        const count = globalResult['data']['paginationOutput'][0]['totalEntries'][0];
        const totalResult = globalResult['data']['searchResult'][0]['@count'];
        const data = globalResult['data']['searchResult'][0]['item'];
        let minItems = Math.min(10, totalResult);
        const header = document.getElementById('result');
        const inputData = JSON.parse(globalData.values);
        const keywords = inputData.keywords;
        header.style.display = "block";
        header.innerHTML = count + " Results found for " + "<em>" + keywords + "</em>";
        if (totalResult > 0) {
            for (let i = 0; i < minItems; i++) {
                const responseData = data[i];
                const title = responseData.title;
                const currentPrice = parseFloat(responseData.sellingStatus[0].currentPrice[0].__value__);
                const shippingServiceCost = responseData.shippingInfo[0].shippingServiceCost;
                const defaultImageURL = responseData.galleryURL[0] ? responseData.galleryURL[0] : "https://csci571.com/hw/hw6/images/ebay_default.jpg";
                let shippingCost = 0;
                if (shippingServiceCost && Array.isArray(shippingServiceCost) && shippingServiceCost.length > 0) {
                    shippingCost = parseFloat(shippingServiceCost[0].__value__) || 0;
                }

                let price = currentPrice;
                if (shippingCost > 0) {
                    price = currentPrice + " ( + $" + shippingCost + " for shipping)";
                }

                let condition = '';
                if (responseData.condition && responseData.condition[0] && responseData.condition[0].conditionDisplayName) {
                    condition = responseData.condition[0].conditionDisplayName[0] || '';
                }

                const topRatedImage = responseData.topRatedListing[0] === 'true' ? '<img id="topRatedImage" src="https://csci571.com/hw/hw6/images/topRatedImage.png" style="height:30px;width:30px;">' : '';
                tag1 += '<div class="card">';
                tag1 += '<table id="data-id" data-index="' + i + '" onclick="ClickData(this)">\n';
                tag1 += '<tr id="dataR">\n';
                tag1 += '<td id="galleryUrl" rowspan="4" style="min-height: 100px;">\n';
                tag1 += '<div class="image-container">';
                tag1 += '<img id="tbImg" src="' + defaultImageURL + '" height="100" width="100"></div></td>';
                tag1 += '<td id="tdata" class="truncate-text"><b>' + title + '</b></td>\n';
                tag1 += '</tr>\n';
                tag1 += '<tr>\n';
                if (responseData.primaryCategory[0] && responseData.primaryCategory[0].categoryName[0]) {
                    tag1 += '<td id="tdata">Category: <em>' + responseData.primaryCategory[0].categoryName[0] + '</em><a target="_blank" href="' + responseData.viewItemURL[0] + '"><img id="redirectData" src="https://www.csci571.com/hw/hw6/images/redirect.png" style="height:10px;width:10px;" onclick="stopPropagation(event);"></a></td>\n';
                }
                tag1 += '</tr>\n';
                tag1 += '<tr>\n';
                if (condition) {
                    tag1 += '<td id="tdata"><div id="Datacontent">Condition: ' + responseData.condition[0].conditionDisplayName[0] + topRatedImage + '</td>\n';
                }
                tag1 += '</tr>\n';
                tag1 += '<tr>\n';
                tag1 += '<td id="tdata"><b>Price: $' + price + '</b></td>\n';
                tag1 += '</tr>\n';
                tag1 += '</table>\n';
                tag1 += '</div>';
            }
            if (totalResult > 10) {
                document.getElementById("showMoreButton").style.display = "block";
                document.getElementById('showLessButton').style.display = "none";
            }
            const responseDiv = document.getElementById('response');
            responseDiv.innerHTML = tag1;
        } else {
            document.getElementById("Dres").style.display = "block";
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const myForm = document.getElementById('myForm');
    function searchData(event){
        event.preventDefault();
        const keywords = document.getElementById('keywords').value.trim();
      
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
       
            let count = data["paginationOutput"][0]["totalEntries"][0]?data["paginationOutput"][0]["totalEntries"][0]:0;
            let totalResult = data["searchResult"][0]["@count"];
           
            if(totalResult==0){
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
            }
     })
      .catch(error => {
         console.error('Error:', error);  
         });
    }
  
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
document.getElementById("line").style.display="none";
});