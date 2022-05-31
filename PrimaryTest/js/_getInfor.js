const api_url = "http://localhost:5000/card/get/base3-9";

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const myJSON = JSON.stringify(data);
    
    document.getElementById('name').textContent = data.name;
    document.getElementById('price').textContent = data.cardmarket.prices.averageSellPrice;
    document.getElementById('rarity').textContent = data.number + " / "  + data.rarity;
    document.getElementById('types').textContent = data.types + " / "  + data.hp + " / "  + data.subtypes;
    document.getElementById('power').textContent = data.abilities[0].type + " : " + data.abilities[0].name;
    document.getElementById('card_text').textContent = data["images"]["small"];


    

    var x = document.createElement("img");
    x.setAttribute("src", data["images"]["small"]);
    x.setAttribute("alt", data.name);
    document.getElementById('image').appendChild(x);

}

getISS();