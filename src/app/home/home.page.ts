import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { from, defer } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Chart, TimeUnit } from 'chart.js';
import { formatDate } from '@angular/common';
import { Storage } from '@ionic/storage';
@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],

})

export class HomePage implements OnInit {
    @ViewChild('lineCanvas') barChart;
    private lineChart: Chart;
    constructor(public alertController: AlertController, private nativeStorage: NativeStorage, private storage: Storage) { }
    happy: number;
    angry: number;
    stressy: number;
    energy: number;
    worry: number;
    bars: any;
    colorArray: any;
    ngOnInit() {
        this.unit = "day";
        this.happy = 50;
        this.angry = 50;
        this.stressy = 50;
        this.energy = 50;
        this.worry = 50;
        //var date = (new Date(), 'yyyy-MM-dd');
        //console.log(formatDate(d.getDate(), "dd/MMM/y", "en_GB"));
        console.log(Date());
        var temp = new Date();
        var temp2 = new Date();
        temp2.setDate(temp.getDate() - 5);
        console.log(temp);
        console.log(formatDate(temp.getDate(), "full", "en_GB"));
        console.log(temp2);
    }
    ionViewDidEnter() {
        this.createLineChart();
    }
    getLastDays() {
        
    }
    createLineChart() {

        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'line',
            data: {
                //labels: [formatDate(new Date().setDate(d.getDate() - 7), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 6), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 5), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 4), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 3), "EEEE", "en_GB"), formatDate(new Date().setDate(d.getDate() - 2), "EEEE", "en_GB"), 'Yesterday', 'Today'],
                datasets: [{
                    label: 'Happiness',
                    data: this.happiness,
                    backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                    borderColor: '#62ff29',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }, {
                        label: 'Anger',
                        data: this.anger,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: '#ff0000',
                        borderWidth: 1
                    }, {
                        label: 'Stress',
                        data: this.happiness,
                        backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                        borderColor: '#cc7722',// array should have same number of elements as number of dataset
                        borderWidth: 1
                    }, {
                        label: 'Energy',
                        data: this.energetic,
                        backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                        borderColor: '#ffff00',// array should have same number of elements as number of dataset
                        borderWidth: 1
                    }, {
                        label: 'Worry',
                        data: this.worrier,
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
    unit: TimeUnit;
    async presentAlertConfirm(header1,message) {
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
            var data = [this.happy, this.angry, this.stressy, this.energy, this.worry]
            console.log(data);
            this.storage.set(formatDate(Date.now(),"YYYY-MM-DDTHH:mm:ss.sssZ","en_GB"),data)
                .then(
                    () => this.nativeStorage.keys().then(r => console.log(r)),
                    error => console.error('Error storing item', error)
                );
        }
        catch(error){
            this.presentAlertConfirm("Something is <b>very</b> wrong - 0x2",  "We failed to save locally. The best thing you can do right now is <s>cry</s>restart the app.");
        }
            /*
            console.log("Happiness: " + this.happy.toString() + "\n" +
                "Anger: " + this.angry.toString() + "\n" +
                "Stress: " + this.stressy.toString() + "\n" +
                "Energy: " + this.energy.toString() + "\n" +
                "Worry: " + this.worry.toString());
            //this.nativeStorage.setItem(new Date(), {property: values, anotherProperty: 'anotherValue'}).then(() => console.log('Stored item!'),error => console.error('Error storing item', error));
     */};
    keyParse() {
        var dates = [];
        var now;
        now = Date();
        dates.push(formatDate(new Date().setDate(now.getDate() - 7), "YYYY-MM-DD", "en_GB"));
        dates.push(formatDate(new Date().setDate(now.getDate() - 6), "YYYY-MM-DD", "en_GB"));
        dates.push(formatDate(new Date().setDate(now.getDate() - 5), "YYYY-MM-DD", "en_GB"));
        dates.push(formatDate(new Date().setDate(now.getDate() - 5), "YYYY-MM-DD", "en_GB"));
        dates.push(formatDate(new Date().setDate(now.getDate() - 3), "YYYY-MM-DD", "en_GB"));
        dates.push(formatDate(new Date().setDate(now.getDate() - 2), "YYYY-MM-DD", "en_GB"));
        dates.push(formatDate(new Date().setDate(now.getDate() - 1), "YYYY-MM-DD", "en_GB"));
        dates.push(formatDate(new Date().setDate(now.getDate() - 0), "YYYY-MM-DD", "en_GB"));

        this.storage.forEach((value, key, index) => {
            if (this.checkSubstrings(dates, key)) {
                this.happiness.push({ x: key, y: value[0] });
                this.anger.push({ x: key, y: value[1] });
                this.stress.push({ x: key, y: value[2] });
                this.energetic.push({ x: key, y: value[3] });
                this.worrier.push({ x: key, y: value[4] });
            }
        })
    }
    happiness: any;
    anger: any;
    stress: any;
    energetic: any;
    worrier: any;

    checkSubstrings(list, string) {
        for (var i = 0; i < list.length; i++) {
            if (string.includes(list[i])) {
                return true;
            }
            else {
                return false;
            }

        }
    }

}
