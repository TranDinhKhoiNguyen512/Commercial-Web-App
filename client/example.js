//var getAPI = 'https://reqres.in/api/users'
var getAPI = 'http://localhost:5000/card/get/base1-2/images/large'
//{mode:'no-cors'}

fetch(getAPI)
    .then(res => res.json())
    .then(data => console.log(data))
