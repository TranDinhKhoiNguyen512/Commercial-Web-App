
//sm5-151
async function getISS(id) {
    const api_url = "http://localhost:5000/card/get/";
    const response = await fetch(api_url + id);
    const data = await response.json();
    const myJSON = JSON.stringify(data);
    
    // var x = document.createElement("img");
    // x.setAttribute("src", data.images.small);
    // console.log(data.images.small)
    // x.setAttribute("alt", data.name);
    var str = `<img src=${data.images.small}></img>`
    //document.getElementById('productImage').insertAdjacentHTML( 'beforeend', str );
    document.getElementById('productImage').src = `${data.images.small}`
    


    document.getElementById('name').textContent = data.name;
    document.getElementById('artist').textContent = data.artist;
    document.getElementById('releaseDate').textContent = data.set.releaseDate;
    document.getElementById('id').textContent = data.id;

    
    document.getElementById('rarity').textContent = data.number + " / "  + data.rarity;
    if(data.types == null){
        typesText = "N/A"
    }
    else{
        typesText = data.types
    }
    if(data.hp == null){
        hpText = "N/A"
    }
    else{
        hpText = data.hp
    }
    document.getElementById('types').textContent = typesText + " / "  + hpText;
    document.getElementById('supertype').textContent = data.supertype;
    document.getElementById('subtype').textContent = data.subtypes;

    document.getElementById('base').textContent = data.set.series + " - " + data.set.id;

    

    if(data.supertype == "Pokemon"){
        cardText = data.flavorText;
    }
    else if(data.supertype == "Trainer"){
        cardText = data.rules
    }
    if(cardText == null || cardText == ''){
        cardText = "N/A";
    }
    if(data.cardmarket.prices.averageSellPrice == null){
        priceText = "N/A";
    }
    else{
        priceText = "$" + data.cardmarket.prices.averageSellPrice;
    }
    document.getElementById('price').textContent = priceText;
    document.getElementById('card_text').textContent = cardText;


    

    

}

// getISS('new1-1');