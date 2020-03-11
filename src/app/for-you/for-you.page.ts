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
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + global.u_id, { responseType: 'text' }).subscribe((data: any) => this.parse(data));
    }
    getOpen(r) {
        console.log("GetOpen");
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + global.u_id, { responseType: 'text' }).subscribe((data: any) => this.parseOpen(data));
    }
    parseOpen(r) {
        this.parse(r);
        console.log("ParseOpen");
        console.log(this.i);
        this.lookFor();
    }
    lookFor() {
        for (var i = 0; i < this.ex3.length; i++) {
            if (this.ex3[i][3] == this.tempI) {
                this.open(i);
                return;
            }
        }
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
        for (var it = 0; it < ex2.length; it++) {
            this.ex3.push(ex2[it].split("<br>"));
            if (this.ex3[it][2].length > 200) {
                this.ex3[it].push(this.ex3[it][2].substring(0, 200) + "...");
            }
            else {
                this.ex3[it].push(this.ex3[it][2]);
            }

        }
        console.log("Ex3: ", this.ex3);
        this.ex3.reverse()
    }
    doRefresh(event) {
        console.log("refresh");
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + global.u_id, { responseType: 'text' }).subscribe((data: any) => this.rfrsh(event, data));
    }
    rfrsh(evt, data) {
        this.detail = false;
        this.parse(data);
        evt.target.complete();
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
            this.down = false;
        }
        if (this.ex3[i][11] == "down") {
            this.down = true;
            this.up = false;
        }
        this.votes = this.ex3[i][4];
    }
    tempI: number;
    voteUp(i) {
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[i][3] + "/vote" + "/up/" + global.u_id.toString(), { responseType: 'text' }).subscribe((data: any) => this.get(data));
    }
    voteDown(i) {
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[i][3] + "/vote" + "/down/" + global.u_id.toString(), { responseType: 'text' }).subscribe((data: any) => this.get(data));
    }
    voteDetailDown() {
        console.log("voteDown");
        console.log(this.i);
        this.tempI=this.ex3[this.i][3]
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[this.i][3] + "/vote" + "/down/" + global.u_id.toString(), { responseType: 'text' }).subscribe((data: any) => this.getOpen(data));
    }
    voteDetailUp() {
        console.log("voteUp");
        console.log(this.i);
        this.tempI = this.ex3[this.i][3]
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[this.i][3] + "/vote" + "/up/" + global.u_id.toString(), { responseType: 'text' }).subscribe((data: any) => this.getOpen(data));
    }
}
