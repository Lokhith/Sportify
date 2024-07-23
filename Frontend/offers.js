var offerContainer = document.getElementById("card-offers")
var search = document.getElementById("search")
var offerlist = offerContainer.querySelectorAll("div")

search.addEventListener("keyup", function(){
  var enteredValue = event.target.value.toUpperCase()
  for(count = 0; count<offerlist.length; count++)
    {
      var offername = offerlist[count].querySelector("p").textContent
      if(offername.toUpperCase().indexOf(enteredValue) < 0)
        {
          offerlist[count].style.display = "none"
        }
        else
        {
          offerlist[count].style.display = "block"
        }
    }
})

fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
});
