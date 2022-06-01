// Constant URL
var api_url1 = 'http://localhost:5000/card/query?type=Psychic'

async function getCardByQuery() {
    const response = await fetch(api_url1);
    const pageData = await response.json();
    var data = pageData.data
    // Create Element and add Img from json
    // console.log(data[1].images.small);
    let imgSrc = data[0].images.small;
    // document.getElementById('Nguyen').setAttribute('data-img', imgSrc);
}

getCardByQuery();