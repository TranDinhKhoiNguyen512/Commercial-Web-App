//localStorage.setItem("cart", JSON.stringify(theCart))

//theCart = JSON.parse(localStorage.getItem("cart"))
function initCart(){
    //only init if not exist
    if( localStorage.getItem("cart") === null){
        localStorage.setItem("cart", JSON.stringify([]));
        console.log("Cart is is successfully initialized")
    }
    else(
        console.log("Cart is already exist!")
    )
}

function addToCart() {
    var cardID =  getParam()
    //if not found in cart
    if(localStorage.getItem(cardID) === null){
        theCart = JSON.parse(localStorage.getItem("cart"))
        console.log('The Cart: ')
        console.log(localStorage.getItem("cart"))
        theCart.push(cardID)
        localStorage.setItem("cart", JSON.stringify(theCart))
        localStorage.setItem(cardID,1)
    }
    else{
        amount = localStorage.getItem(cardID)
        newamount = parseInt(amount) + 1
        localStorage.setItem(cardID,newamount)
    }
    listCart()

}

function listCart(){
    theCart = JSON.parse(localStorage.getItem("cart"))
    emptyArr = []
    for(item in theCart){
        cardID = theCart[item];
        amount = localStorage.getItem(theCart[item]);
        emptyArr.push([cardID,amount])
    }
    console.log(theCart)
}

function clearCart(){
    localStorage.clear()
}

function deleteProduct(cardID){
    localStorage.removeItem(cardID)
    theCart = JSON.parse(localStorage.getItem("cart"))
    for(item in theCart){
        if( theCart[item] == cardID){
            theCart.splice(item, 1)
            console.log(theCart)
            localStorage.setItem("cart", JSON.stringify(theCart))
        }

    }
    loadCart()
}

function cartCounter(){
    theCart = JSON.parse(localStorage.getItem("cart"))
    console.log(theCart.length)
    return theCart.length
}
var clearCartDiv = function () {
    var newProductList = document.getElementById('cart__list');
    newProductList.innerHTML = "";
    // var newProductDiv = ` <div class="container list" id="productList"></div>`;
}
async function loadCart(){
    clearCartDiv()
    const api_url = "http://localhost:5000/card/get/";
    theCart = JSON.parse(localStorage.getItem("cart"))
    totalCost = 0
    //productDetailURL = 'http://127.0.0.1:5501/productDetail.html?card='
    for(item in theCart){
        var response = await fetch(api_url + theCart[item]);
        var data = await response.json();
        amount =  parseInt(localStorage.getItem(theCart[item]))
        eachCardPrice = data.cardmarket.prices.averageSellPrice
        totalCardPrice = parseFloat((amount * eachCardPrice).toFixed(2))
        totalCost += totalCardPrice
        var itemstr = `<tr>
                        <td class="image" id="image" style="text-align: center">
                            <img src="${data.images.small}" alt=${data.name}>
                        </td>
                        <td class="product__name" id="product__name">
                            <p><a href="http://127.0.0.1:5501/productDetail.html?card=${theCart[item]}" ><h6>${theCart[item]}: ${data.name}<h6></a></p>  
                        </td>
                        <td class="amount" id="amount" >
                            <input type="number" size="4" min="1" id="${theCart[item]}" value="${localStorage.getItem(theCart[item])}" class="tc item-quantity" style ="text-align: center;" >
                        </td>
                        <td class="price">
                            <p>
                                Each: $${eachCardPrice}
                            </p>
                            <p>
                                Total: $${totalCardPrice}
                            </p>
                        </td>
                        <td class="delete__button" id="delete__button">
                            <button type="button" class="custom-btn btn-13" onclick="deleteProduct('${theCart[item]}')">Delete</button>
                        </td>
                    </tr>`
        document.getElementById('cart__list').insertAdjacentHTML( 'beforeend', itemstr );
    }
    costEle = document.getElementById('totalCost')
    costEle.innerHTML = '$'+totalCost.toFixed(2)
}
function updateCart(){
    theCart = JSON.parse(localStorage.getItem("cart"))
    for(item in theCart){
        cardAmount = document.getElementById(theCart[item]).value
        console.log(cardAmount)
        localStorage.setItem(theCart[item],cardAmount)

    }
    loadCart()
}