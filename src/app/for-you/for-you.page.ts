import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.page.html',
  styleUrls: ['./for-you.page.scss'],
})
export class ForYouPage implements OnInit {


    constructor(private http: HttpClient) { }
    detail: boolean;
    searchTerm: any;
    ngOnInit() {
        this.u_id = localStorage.getItem("u_id");
        this.searched = false;
        this.search = false;
        this.detail = false;
        this.get(null);
        console.log("Resp: " + this.resp);
    }
    u_id: any;
    parsedValues: any;/*
    getBetter() {
        this.parsedValues = [0,0,0,0,0];
        for (var i = 0; i < this.value.length; i++) {
            if (this.value[i]) {
                this.parsedValues[i] = 1;
            }
        }
        console.log("http://aurora-django.herokuapp.com/posts/betterIndex/" + this.parsedValues[0].toString() + "/" + this.parsedValues[1].toString() + "/" + this.parsedValues[2].toString() + "/" + this.parsedValues[3].toString() + "/" + this.parsedValues[4].toString() + "/0/" + "50" + "/" + this.u_id);
        this.http.get("http://aurora-django.herokuapp.com/posts/betterIndex/" + this.parsedValues[0].toString() + "/" + this.parsedValues[1].toString() + "/" + this.parsedValues[2].toString() + "/" + this.parsedValues[3].toString() + "/" + this.parsedValues[4].toString() + "/0/" + "50"+"/"+ this.u_id, { responseType: 'text' }).subscribe((data: any) => this.parseSearch(data));
    }*/
    get(r) {
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + this.u_id, { responseType: 'text' }).subscribe((data: any) => this.parse(data));
    }
    getOpen(r) {
        console.log("GetOpen");
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + this.u_id, { responseType: 'text' }).subscribe((data: any) => this.parseOpen(data));
    }
    parseOpen(r) {
        this.parse(r);
        console.log("ParseOpen");
        console.log(this.i);
        this.lookFor();
    }/*
    parseOpenSearch(r) {
        this.parseSearch(r);
        this.openSearched(this.tempI);
    }*/
    lookFor() {
        for (var i = 0; i < this.ex3.length; i++) {
            if (this.ex3[i][3] == this.tempI) {
                this.open(i);
                return;
            }
        }
    }
    index: any;
    lookForIndex() {
        for (var i = 0; i < this.ex3.length; i++) {
            if (this.ex3[i][3] == this.tempI) {
                this.index = i;
                return;
            }
        }
    }
    search: boolean;
    openSearch() {
        this.detail = false;
        this.search = true;

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
    cont2: any;
    title2: any;
    sub2: any;
    poster2: any;
    happy2: boolean;
    angry2: boolean;
    stressy2: boolean;
    energy2: boolean;
    worry2: boolean;
    up2: boolean;
    down2: boolean;
    votes2: number;
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
    parseSearch(text) {
        var ex2 = text.split("<hr>");
        ex2.pop()
        console.log("Ex2:", ex2);
        this.ex32 = []
        for (var it = 0; it < ex2.length; it++) {
            this.ex32.push(ex2[it].split("<br>"));
            if (this.ex32[it][2].length > 200) {
                this.ex32[it].push(this.ex32[it][2].substring(0, 200) + "...");
            }
            else {
                this.ex32[it].push(this.ex3[it][2]);
            }

        }
        console.log("Ex32: ", this.ex32);
        this.ex32.reverse()
        this.searched = true;
        console.log("This.searched: " + this.searched);
    }
    searched: boolean;
    public ex32 = [];
    doRefresh(event) {
        console.log("refresh");
        this.http.get("http://aurora-django.herokuapp.com/posts/index/" + this.u_id, { responseType: 'text' }).subscribe((data: any) => this.rfrsh(event, data));
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
    i2: any;
    searchDetail: boolean;
    openSearched(i) {
        this.i2 = i;
        this.searchDetail = true;
        if (this.ex32[i][5] = "1") {
            this.happy2 = true;
        }
        if (this.ex32[i][6] = "1") {
            this.angry2 = true;
        }
        if (this.ex32[i][7] = "1") {
            this.stressy2 = true;
        }
        if (this.ex32[i][8] = "1") {
            this.energy2 = true;
        }
        if (this.ex32[i][9] = "1") {
            this.worry2 = true;
        }
        this.title2 = this.ex32[i][0];
        this.sub2 = this.ex32[i][1];
        this.cont2 = this.ex32[i][2];
        this.poster2 = this.ex32[i][10];
        if (this.ex32[i][11] == "up") {
            this.up2 = true;
            this.down2 = false;
        }
        if (this.ex32[i][11] == "down") {
            this.down2 = true;
            this.up2 = false;
        }
        this.votes = this.ex3[i][4];
    }
    temp3: any;
    openIndex(i) {
        this.tempI = i;
        this.lookForIndex();
        this.open(i);
    }
    tempI: number;
    voteUp(i) {
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[i][3] + "/vote" + "/up/" + this.u_id, { responseType: 'text' }).subscribe((data: any) => this.get(data));
    }
    voteDown(i) {
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[i][3] + "/vote" + "/down/" + this.u_id, { responseType: 'text' }).subscribe((data: any) => this.get(data));
    }
    voteDetailDown() {
        console.log("voteDown");
        console.log(this.i);
        this.tempI=this.ex3[this.i][3]
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[this.i][3] + "/vote" + "/down/" + this.u_id, { responseType: 'text' }).subscribe((data: any) => this.getOpen(data));
    }
    voteDetailUp() {
        console.log("voteUp");
        console.log(this.i);
        this.tempI = this.ex3[this.i][3]
        this.http.get("http://aurora-django.herokuapp.com/posts/" + this.ex3[this.i][3] + "/vote" + "/up/" + this.u_id, { responseType: 'text' }).subscribe((data: any) => this.getOpen(data));
    }
    value: any;
    logLog(value) {
        this.value = value;
    }
}
