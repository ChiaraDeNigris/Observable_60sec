import { ajax } from "rxjs/ajax";
import { Observable, interval } from "rxjs";

const apiKey = "96af4532f05b220a34f6e04bd277f6ef";
const URL =
  "https://api.openweathermap.org/data/2.5/weather?APPID=" +
  apiKey +
  "&units=metric&q=";
var cityElems = document.getElementsByClassName("citta");
//console.log(cityElems);
const tick = interval(10000);

//Costruisco l'observable
const temp = new Observable(subscriber =>
  tick.subscribe({
    next(n) {
      let somma=0;
      for (var city of cityElems) {
        fetch(URL + city.innerHTML)
          .then(response => response.json())
          .then(data => {
            var t = data.main.temp;
            somma += t;
            subscriber.next(somma/ cityElems.length);
          });
      }
    }
  })
);

// Due subscriber
var somma = 0;
temp.subscribe({
  next(x:number) {
    console.log("media = " + x);
    document.getElementById("output").innerHTML = x + "<br>";
  },
  complete() {
    console.log("done");
  }
});
