// const { type } = require("express/lib/response");

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
    for (type in arrayType){
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
    for (subtype in arraySubtype){
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
    for (rarity in arrayRarity){
        rarityString = rarityString + arrayRarity[rarity] + ','
    }
    rarityQuery = rarityString.substring(0, rarityString.length - 1)
    
    var result = searchString + typeQuery + subtypeQuery + rarityQuery;
    //console.log(result)
    return result
}

var clearDiv = function(){
    var newProductList = document.getElementById('productList');
    newProductList.innerHTML = "";
    // var newProductDiv = ` <div class="container list" id="productList"></div>`;
}

document.getElementById('check__submit').onclick = function () {
   clearDiv();
   var typeURL =  getCheckBoxValue();
   var apiMultiple = 'http://localhost:5000/card/query?'+typeURL;
   atvImg(apiMultiple);
   console.log(apiMultiple)
}
