import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { from, defer } from 'rxjs';
import { AlertController} from '@ionic/angular';
import { Chart, TimeUnit } from 'chart.js';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],

})

export class HomePage implements OnInit {
    @ViewChild('lineCanvas') barChart;
    private lineChart: Chart;
    constructor(public alertController: AlertController, public router: Router) { }
    happy: number;
    angry: number;
    stressy: number;
    energy: number;
    worry: number;
    bars: any;
    colorArray: any;
    public happiness = [];
    public anger = [];
    public stress = [];
    public energetic = [];
    public worrier = [];
    public dates = [];
    ngOnInit() {
        //var settings = JSON.parse(localStorage.getItem("settings"));
        if (localStorage.getItem("loginState") == "0" || localStorage.getItem("loginState") == null) {
            this.router.navigate(['/signin']);
        }
        else {
            //console.log("U_id: " + Number(global.u_id));
        }
        this.unit = "day";
        this.happy = 50;
        this.angry = 50;
        this.stressy = 50;
        this.energy = 50;
        this.worry = 50;
        //var date = (new Date(), 'yyyy-MM-dd');
        //console.log(formatDate(d.getDate(), "dd/MMM/y", "en_GB"));
        /*console.log(Date());
        var temp = new Date();
        var temp2 = new Date();
        temp2.setDate(temp.getDate() - 5);
        console.log(temp);
        console.log(formatDate(temp.getDate(), "full", "en_GB"));
        console.log(temp2);*/
    }
    ionViewDidEnter() {
        //this.define();
        this.keyParse();
        this.createLineChart();
    }
    createLineChart() {

        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'line',
            data: {
                //labels: [formatDate(new Date().setDate(d.getDate() - 7), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 6), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 5), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 4), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 3), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 2), "EEEE", "en_GB"), 'Yesterday', 'Today'],
                datasets: [{
                    label: 'Happiness',
                    data: this.happinessKey(),
                    backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                    borderColor: '#62ff29',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }, {
                        label: 'Anger',
                        data: this.angerKey(),
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: '#ff0000',
                    borderWidth: 1
                }, {
                        label: 'Stress',
                        data: this.stressKey(),
                    backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                    borderColor: '#cc7722',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }, {
                        label: 'Energy',
                        data: this.energyKey(),
                    backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                    borderColor: '#ffff00',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }, {
                        label: 'Worry',
                        data: this.worryKey(),
                    backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                    borderColor: '#41009c',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: this.unit
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]

                }
            }
        });
    }
    happinessKey() {
        let list = [];
        for (var i = 0; i < this.happiness.length; i++) {
            console.log("pushing: " + { x: this.dates[i], y: this.happiness[i] });
            list.push({ x: this.dates[i], y: this.happiness[i] });
        }
        console.log("happyList: " + this.happiness);
        console.log("list: " + list);
        return list;
    }
    angerKey() {
        let list = [];
        for (var i = 0; i < this.anger.length; i++) {
            list.push({ x: this.dates[i], y: this.anger[i] });
        }
        return list;
    }
    stressKey() {
        let list = [];
        for (var i = 0; i < this.stress.length; i++) {
            list.push({ x: this.dates[i], y: this.stress[i] });
        }
        return list;
    }
    energyKey() {
        let list = [];
        for (var i = 0; i < this.energetic.length; i++) {
            list.push({ x: this.dates[i], y: this.energetic[i] });
        }
        return list;
    }
    worryKey() {
        let list = [];
        for (var i = 0; i < this.worrier.length; i++) {
            list.push({ x: this.dates[i], y: this.worrier[i] });
        }
        return list;
    }
    unit: TimeUnit;
    async presentAlertConfirm(header1, message) {
        const alert = await this.alertController.create({
            header: header1,
            message: message,
            buttons: [
                {
                    text: 'But I like this app!',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'EXTERMINATE!',
                    handler: () => {
                        this.presentAlert("No can do", "Apple doesn't like closing the app through code, so you're going to have to do it manually.");
                    }
                }
            ]
        });

        await alert.present();
    }
    async presentAlert(header1, message) {
        const alert = await this.alertController.create({
            header: header1,
            message: message,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    }
    save() {//this.presentAlert("Networking Error - 0x01", "I think you're offline. If you aren't then my server is down. If this issue persists, <a href=\"mailto:schwarz.abbas@gmail.com\">tell me</a>. This app will now proceed to attempt to save to local-storage.");

        try {
            var data2 = [this.happy, this.angry, this.stressy, this.energy, this.worry]
            console.log(data2);
            var local = JSON.parse(localStorage.getItem("data"));
            if (local.dates != null) {
                local.dates.push(Date.now());
                local.data.push(data2);
            } else {
                local.dates = [];
                local.data = [];
                local.dates.push(Date.now());
                local.data.push(data2);
            }
            localStorage.setItem("data", JSON.stringify(local));
            console.log("Save: " + localStorage.getItem("data"));
            
        }
        catch (error) {
            console.warn(error);
            localStorage.setItem("data", JSON.stringify({ "data": [], "dates": [] }));
            this.save();
            //this.presentAlertConfirm("Something is <b>very</b> wrong - 0x2",  "We failed to save locally. The best thing you can do right now is <s>cry</s>restart the app.");
        }

        this.keyParse();
        location.reload();
            /*
            console.log("Happiness: " + this.happy.toString() + "\n" +
                "Anger: " + this.angry.toString() + "\n" +
                "Stress: " + this.stressy.toString() + "\n" +
                "Energy: " + this.energy.toString() + "\n" +
                "Worry: " + this.worry.toString());
            //this.nativeStorage.setItem(new Date(), {property: values, anotherProperty: 'anotherValue'}).then(() => console.log('Stored item!'),error => console.error('Error storing item', error));
     */};
    keyParse() {
        this.happiness = [];
        this.anger = [];
        this.stress = [];
        this.energetic = [];
        this.worrier = [];
        var dates = JSON.parse(localStorage.getItem("data")).dates;
        console.log(dates);
        var data = JSON.parse(localStorage.getItem("data")).data;
        console.log(data);
        console.log();
        for (var i = 0; i < dates.length; i++) {
            if (this.checkSubstrings(dates[i])) {
                this.happiness.push(data[i][0]);
                this.anger.push(data[i][1]);
                this.stress.push(data[i][2]);
                this.energetic.push(data[i][3]);
                this.worrier.push(data[i][4]);
                this.dates.push(dates[i]);
            }
        }
        this.createLineChart();
        console.log("happiness: ");
        console.log(localStorage.getItem("data"));
        console.log("raw:");
        console.log({ x: dates[0], y: data[0][0] });
        console.log("happyKey: "+this.happinessKey());
    }
    checkSubstrings(val) {
        var now;
        now = new Date();
        var ago = new Date().setDate(now.getDate() - 7);
        console.log(formatDate(ago, "full", "en_GB"));
        console.log(val);
        if (val > ago) {
            console.log("yes");
                return true;
            }
        else {
            console.log("no");
                return false;
            }

        
    }

}
