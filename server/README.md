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
http://localhost:5000/card/getall
```
###### Card GetDetail
```
http://localhost:5000/card/get/{cardID}
```
###### You can get any value of the card with maximum upto 4 param (not counting cardID)
```
http://localhost:5000/card/get/{cardID}/tcgplayer/prices/holofoil/low
```
  or
```
http://localhost:5000/card/get/{cardID}/set/id
```
  or
```
http://localhost:5000/card/get/{cardID}/images/large
```
  or just 
```
http://localhost:5000/card/get/{cardID}/images
```
###### Query string testing
```
http://localhost:5000/card/query?searchstring=&set=&series=&rarity=&supertype=&subtype=&type=
```
```
searchstring : Card name or id
set : id of the set
series : id of the series
rarity : rarity
supertype : Pokemon or Trainer 
subtype : 
type : pokemon Type
```
*Swagger UI for APIs will be added later in the project*