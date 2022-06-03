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
///////////////////////////
    var typeDiv = document.querySelector('.energy_type')
    var checkboxes = typeDiv.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        arrayType.push(checkboxes[i].value)
    }


    var typeString = '&type='
    for (item in arrayType){
        typeString = typeString + arrayType[item] + ','
    }
    var result = searchString + typeString.substring(0, typeString.length - 1);
    console.log(result)
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
