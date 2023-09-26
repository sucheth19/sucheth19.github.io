document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const shippingExpeditedCheckbox = document.getElementById('expedited');
    const showMoreButton = document.getElementById('showMoreButton');
    let finalData = [];
    let numItemsToDisplay = 0;
    let totalItems = 0;
    let displayedItems = 3;
function singleItem(){
    console.log('single')
    const singleItem = document.getElementsByClassName('singleItem').style.display = 'none';
    document.getElementById('result').style.visibility = 'hidden';
}
function updateItems(){
        resultsList.innerHTML = '';
        finalData.slice(0,numItemsToDisplay).forEach(item=>{
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');
        const title = item.title[0];
        const categoryName = item.primaryCategory[0].categoryName[0];
        const viewItemURL = item.viewItemURL[0];
        const conditionDisplayName = item.condition[0].conditionDisplayName[0];
        const priceValue = parseFloat(item.sellingStatus[0].convertedCurrentPrice[0].__value__ + item.shippingInfo[0].shippingServiceCost[0].__value__);
        const price = priceValue.toFixed(2);
        const currency = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
        const galleryURL = item.galleryURL[0];
        const itemTopRatedImage = item.topRatedListing[0];
        const itemTopRated = itemTopRatedImage === 'true' ? '<img src="https://www.csci571.com/hw/hw6/images/topRatedImage.png" alt="Top Rated" class="top-rated-image" style="width:10px;height:10px;" />' : '';
        const redirectLink = item.viewItemURL[0];

        cardContainer.innerHTML = `
        <div class="item" onclick="singleItem()">
            <img src="${galleryURL}" alt="${title}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${title}</h3>
                <p class="card-category">Category: ${categoryName}<a href="${redirectLink}" alt="" target="_blank"><img src="https://www.csci571.com/hw/hw6/images/redirect.png" style="width:10px;height:10px;"/></a></p>
                <p class="card-condition">Condition: ${conditionDisplayName}${itemTopRated}</p>
                <p class="card-price">Price: $${price}</p>
            </div>
            </div>
        `;
        resultsList.appendChild(cardContainer);
        });
  
    if (numItemsToDisplay < totalItems) {
            showMoreButton.style.display = 'block';
            showMoreButton.innerText = 'Show More';
        } else {
            showMoreButton.style.display = 'none';
        }
    }
    searchButton.addEventListener('click', function(e) {
    e.preventDefault();
    totalItems = finalData.length;
    const searchResult = document.getElementById('result')
    searchResult.style.visibility = 'visible';
    document.getElementById('showMoreButton').style.display = 'block';
    const keywords = document.getElementById('keywords').value.trim();

    let fromPrice = fromInput.value.trim() === '' ? 0 : parseFloat(fromInput.value);
    let toPrice = toInput.value.trim() === '' ? 0 : parseFloat(toInput.value);
    if(fromPrice<0 || toPrice<0){
        alert("Price Range values cannot be negative! Please try a value greater than or equal to 0.0");
        return false;
    }
    if(fromPrice>toPrice){
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
    if (!isNaN(fromPrice)) {
            queryParams.push(`fromPrice=${fromPrice}`);
    }
    if (!isNaN(toPrice)) {
        queryParams.push(`toPrice=${toPrice}`);
    }
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
    const queryString = queryParams.join('&');
    const requestURL = `/?${queryString}`;


    fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            console.log('data',data)
            const count = data["paginationOutput"][0]["totalEntries"][0]
            resultsList.innerHTML = '';
            const result = document.getElementById('result');
            if (count>0){
                result.innerHTML = `${count} Results found for <span class="keywords">${keywords}</span>`;
            }
            else{
                result.innerHTML = "No Results found";
            }

        data = data['searchResult'][0]["item"];
        finalData = data;
        numItemsToDisplay = 3;
        updateItems();
     })
      .catch(error => {
         console.error('Error:', error);  
         });

});
showMoreButton.addEventListener('click', function () {
    if (numItemsToDisplay === displayedItems) {
        numItemsToDisplay += 7;
        showMoreButton.innerText = 'Show Less';
    }else{
        numItemsToDisplay = Math.min(numItemsToDisplay + 7, totalItems);
        showMoreButton.innerText = 'Show More';
    }
        updateItems();
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
document.getElementById('result').style.visibility = 'hidden';
document.getElementById('showMoreButton').style.display = 'none';

result.innerHTML = '';
resultsList.innerHTML = ''; 

});
});

   
