// const { type } = require("express/lib/response");
var queryString = ''
var pageNumber = 1
var totalPage = 0
var getCheckBoxValue = function () {
    var arrayType = []
    var arraySubtype = []
    var arrayRarity = []
    var searchString = 'searchstring=' + document.getElementById('inputCardName').value;


    /////////////////////////////
    var typeDiv = document.querySelector('.energy_type')
    var checkboxes = typeDiv.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        arrayType.push(checkboxes[i].value)
    }
    var typeString = '&type='
    for (type in arrayType) {
        typeString = typeString + arrayType[type] + ','
    }
    typeQuery = typeString.substring(0, typeString.length - 1)
    ///////////////////////////
    var subtypeDiv = document.querySelector('.subtypeDIV')
    var checkboxes = subtypeDiv.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        arraySubtype.push(checkboxes[i].value)
    }
    var subtypeString = '&subtype='
    for (subtype in arraySubtype) {
        subtypeString = subtypeString + arraySubtype[subtype] + ','
    }
    subtypeQuery = subtypeString.substring(0, subtypeString.length - 1)
    //////////////////////////
    var rarityDiv = document.querySelector('.rarityDIV')
    var checkboxes = rarityDiv.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        arrayRarity.push(checkboxes[i].value)
    }
    var rarityString = '&rarity='
    for (rarity in arrayRarity) {
        rarityString = rarityString + arrayRarity[rarity] + ','
    }
    rarityQuery = rarityString.substring(0, rarityString.length - 1)

    var result = searchString + typeQuery + subtypeQuery + rarityQuery;
    //console.log(result)
    return result
}

var clearDiv = function () {
    var newProductList = document.getElementById('productList');
    newProductList.innerHTML = "";
    // var newProductDiv = ` <div class="container list" id="productList"></div>`;
}

async function search() {
    var x = document.getElementById("myLinks");
    x.style.display = "none";
    pageNumber = 1
    clearDiv();
    queryString = getCheckBoxValue();
    var apiMultiple = 'http://localhost:5000/card/query?' + queryString;
    atvImg(apiMultiple);
    var api_url1 = apiMultiple;
    var response = await fetch(api_url1);
    var pageData = await response.json();
    totalPage = pageData.total
    document.querySelector( '#page__number' ).innerHTML = pageNumber + ' / ' + totalPage;
    //console.log(apiMultiple)
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
    search(document.getElementById('searchText'));
    e.preventDefault();
}, false);

async function nextPage(){
    if(pageNumber < totalPage){
        var x = document.getElementById("myLinks");
        x.style.display = "none";
        clearDiv();
        typeURL = getCheckBoxValue();
        pageNumber = pageNumber + 1
        var apiMultiple = 'http://localhost:5000/card/query?' + typeURL + `&page=${pageNumber}`;
        atvImg(apiMultiple);
        document.querySelector( '#page__number' ).innerHTML = pageNumber + ' / ' + totalPage;
        //console.log(apiMultiple)
    }
    
}
async function backPage(){
    if(pageNumber > 1){
        var x = document.getElementById("myLinks");
        x.style.display = "none";
        clearDiv();
        typeURL = getCheckBoxValue();
        pageNumber = pageNumber - 1
        var apiMultiple = 'http://localhost:5000/card/query?' + typeURL + `&page=${pageNumber}`;
        atvImg(apiMultiple);
        document.querySelector( '#page__number' ).innerHTML = pageNumber + ' / ' + totalPage;
        //console.log(apiMultiple)
    }
    
}
search()

async function checkMath() {
    
}