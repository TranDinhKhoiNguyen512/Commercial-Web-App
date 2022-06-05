//localstorage.names = JSON.stringify(names);
//var storedNames = JSON.parse(localStorage.names);
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
}

function cartCounter(){
    theCart = JSON.parse(localStorage.getItem("cart"))
    console.log(theCart.length)
    return theCart.length
}

function loadCart(){
    theCart = JSON.parse(localStorage.getItem("cart"))
    for(item in theCart){
        var itemstr = `<tr>
                        <td class="image" id="image">
                            <p>
                                IMAGE
                            </p>
                        </td>
                        <td class="product__name" id="product__name">
                            <p>
                                ${theCart[item]}
                            </p>
                        </td>
                        <td class="amount" id="amount" >
                            <input type="number" size="4" name="updates[]" min="1"  value="1"
                                class="tc item-quantity" style ="text-align: center;">
                        </td>
                        <td class="price">
                            <p>
                                $100
                            </p>
                        </td>
                        <td class="delete__button" id="delete__button">
                            <button type="button" class="custom-btn btn-13">Delete</button>
                        </td>
                    </tr>`
        document.getElementById('cart__list').insertAdjacentHTML( 'beforeend', itemstr );
    }
    
}