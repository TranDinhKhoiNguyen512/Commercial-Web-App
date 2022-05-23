# Server side of the project
## Created by The Eyes of The Illuminati
![PokeBall](https://raw.githubusercontent.com/TranDinhKhoiNguyen512/Commercial-Web-App/main/FinalProjectWAD/img/poke.ico)

## To start the server
```
  node app.js
```
## Test API
###### Card GetAll
```
http://localhost:3000/card/getall
```
###### Card GetDetail
```
http://localhost:3000/card/getByID/{cardID}
```
###### You can get any value of the card with 2 param or 1 param
```
http://localhost:3000/card/get/{cardID}/set/id
```
  or
```
http://localhost:3000/card/get/{cardID}/images/large
```
  or just 
```
http://localhost:3000/card/get/{cardID}/images
```
*Swagger UI for APIs will be added later in the project*