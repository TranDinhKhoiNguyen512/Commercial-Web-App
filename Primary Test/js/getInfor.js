const api_url = "http://localhost:5000/card/get/swsh9-56";

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const myJSON = JSON.stringify(data);
    
    var x = document.createElement("img");
    x.setAttribute("src", data.images.small);
    x.setAttribute("alt", data.name);
    document.getElementById('image').appendChild(x);


    document.getElementById('name').textContent = data.name;
    document.getElementById('artist').textContent = data.artist;
    document.getElementById('releaseDate').textContent = data.set.releaseDate;
    document.getElementById('id').textContent = data.id;

    document.getElementById('price').textContent = "$" + data.cardmarket.prices.averageSellPrice;
    document.getElementById('rarity').textContent = data.number + " / "  + data.rarity;
    document.getElementById('types').textContent = data.types + " / "  + data.hp;
    document.getElementById('base').textContent = data.set.series + " - " + data.set.id;
    releaseDate
    document.getElementById('stage').textContent = data.subtypes;

    

    
    document.getElementById('card_text').textContent = data.flavorText;


    

    

}

getISS();