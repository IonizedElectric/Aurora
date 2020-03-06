import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.page.html',
  styleUrls: ['./for-you.page.scss'],
})
export class ForYouPage implements OnInit {

    constructor(private http: HttpClient) {}

    ngOnInit() {
        
        var example = "title<br>sub<br>cont<br>5<br>32<br>1<br>1<br>1<br>1<br>1<br>admin<hr>title2<br>sub2<br>con2t<br>5<br>32<br>1<br>1<br>1<br>1<br>1<br>admin2<hr>";
        this.http.get("http://aurora-django.herokuapp.com/posts", { responseType: 'text' }).toPromise()
            .then(r => this.parse(r));
        console.log("Resp: " + this.resp);
        /*
        var xe1 = [];
        var xe2 = [];
        var xe3 = [];
        for (var i = 0; i < xe1.length; i++) {
            xe3.push()
        }*/
    }/*get it.
    this.http.get<any>(temp).toPromise()
    .then(r => console.log('response', r)).catch(error => console.error(error));*/

    public ex3 = [];
    public resp = "";
    public base = "True";
    parse(text) {
        var ex2 = text.split("<hr>");
        ex2.pop()
        console.log("Ex2:", ex2);
        //var ex3 = []
        for (var i = 0; i < ex2.length; i++) {
            this.ex3.push(ex2[i].split("<br>"));


        }
        console.log("Ex3: ", this.ex3);
    }
}
