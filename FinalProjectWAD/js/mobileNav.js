// getElementById đầu chứa ID của thẻ lớn.
// getElementById sau là thẻ nhỏ hơn bên trong thẻ đầu
// Có 3 function vì ngoài Advantage Search bên ngoài thì
// còn mở thêm 2 thẻ Card Type và Rarity bên trong
document.getElementById('top').onclick = function advantageSearch() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

document.getElementById('card__type').onclick = function cardType() {
  var x = document.getElementById("cardType");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

document.getElementById('type').onclick = function Rarity() {
  var x = document.getElementById("Rarity");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}