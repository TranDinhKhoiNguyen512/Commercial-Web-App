//var getAPI = 'https://reqres.in/api/users'
// var getAPI = 'http://localhost:5000/card/get/base1-1'
// //{mode:'no-cors'}

// fetch(getAPI)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         // console.log(data);
//         var myData = data;

//         document.getElementById("data").textContent = myData; 
//     })
//     .catch(function(err){
//         console.log(err);
//     });


const api_url = 'http://localhost:5000/card/get/base1-1';
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const myJSON = JSON.stringify(data);
    document.getElementById('abilities').textContent = "HP: " + data.abilities[0].name;
    var x = document.createElement("IMG");
    x.setAttribute("src", data.images.small);
    x.setAttribute("alt", "The Pulpit Rock");
    document.getElementById('artist').appendChild(x);

}

getISS();