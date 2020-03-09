import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from '../global';
@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.page.html',
  styleUrls: ['./for-you.page.scss'],
})
export class ForYouPage implements OnInit {

    constructor(private http: HttpClient) { }
    detail: boolean;
    ngOnInit() {
        global.u_id = 4;
        this.detail = false;
        //var example = "title<br>sub<br>cont<br>5<br>32<br>1<br>1<br>1<br>1<br>1<br>admin<hr>title2<br>sub2<br>con2t<br>5<br>32<br>1<br>1<br>1<br>1<br>1<br>admin2<hr>";
        this.get(null);
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
    get(r) {
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + global.u_id, { responseType: 'text' }).toPromise()
            .then(r => this.parse(r));
    }
    getOpen(r) {
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + global.u_id, { responseType: 'text' }).toPromise()
            .then(r => this.parseOpen(r))
    }
    parseOpen(r) {
        this.parse(r);
        this.open(this.i);
    }
    cont: any;
    title: any;
    sub: any;
    i: number;
    poster: any;
    happy: boolean;
    angry: boolean;
    stressy: boolean;
    energy: boolean;
    worry: boolean;
    up: boolean;
    down: boolean;
    votes: number;
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
    open(i) {
        this.i = i;
        this.detail = true;
        if (this.ex3[i][5] = "1") {
            this.happy = true;
        }
        if (this.ex3[i][6] = "1") {
            this.angry = true;
        }
        if (this.ex3[i][7] = "1") {
            this.stressy = true;
        }
        if (this.ex3[i][8] = "1") {
            this.energy = true;
        }
        if (this.ex3[i][9] = "1") {
            this.worry = true;
        }
        this.title = this.ex3[i][0];
        this.sub = this.ex3[i][1];
        this.cont = this.ex3[i][2];
        this.poster = this.ex3[i][10];
        if (this.ex3[i][11] == "up") {
            this.up = true;
        }
        if (this.ex3[i][11] == "down") {
            this.down = true;
        }
        this.votes = this.ex3[i][4];
    }
    voteUp(i) {
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[i][3] + "/vote" + "/up/"+global.u_id, { responseType: 'text' }).toPromise()
            .then(r => this.get(r));
    }
    voteDown(i) {
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[i][3] + "/vote" + "/down/" + global.u_id, { responseType: 'text' }).toPromise()
            .then(r => this.get(r));
    }
    voteDetailDown() {
        console.log("voteUp");
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[this.i][3] + "/vote" + "/down/" + global.u_id, { responseType: 'text' }).toPromise()
            .then(r => this.getOpen(r));
    }
    voteDetailUp() {
        console.log("voteDown");
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[this.i][3] + "/vote" + "/up/" + global.u_id, { responseType: 'text' }).toPromise()
            .then(r => this.getOpen(r));
    }
}
