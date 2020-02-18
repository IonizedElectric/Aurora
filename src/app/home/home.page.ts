import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { from, defer } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],

})

export class HomePage implements OnInit {
    @ViewChild('lineCanvas', { static: false }) barChart;
    private lineChart: Chart;
    constructor(private http: HttpClient, public alertController: AlertController, private nativeStorage: NativeStorage) { }
    happy: number;
    angry: number;
    stressy: number;
    energy: number;
    worry: number;
    bars: any;
    colorArray: any;
    ngOnInit() {
        this.happy = 50;
        this.angry = 50;
        this.stressy = 50;
        this.energy = 50;
        this.worry = 50;/*
        this.lineChart = new Chart(null, {
            type: 'line',
            data: {
                labels: ["1500", "1600", "1700", "1750", "1800", "1850", "1900", "1950", "1999", "2050"],
                datasets: [{
                    data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                    label: "Hapiness",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                    label: "Anger",
                    borderColor: "#8e5ea2",
                    fill: false
                }, {
                    data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                    label: "Worry",
                    borderColor: "#3cba9f",
                    fill: false
                }, {
                    data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                    label: "Stress",
                    borderColor: "#e8c3b9",
                    fill: false
                }, {
                    data: [6, 3, 2, 2, 7, 4, 5, 15, 0, 9999],
                    label: "Energy",
                    borderColor: "#c45850",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Feelings'
                }
            }
        });*/
    }
    ionViewDidEnter() {
        this.createLineChart();
    }
    createLineChart() {
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'line',
            data: {
                labels: ['Tuesday', 'Tuesday', 'Tuesday', 'Tuesday', 'Tuesday', 'Tuesday', 'Yesterday', 'Today'],
                datasets: [{
                    label: 'Happiness',
                    data: [25, 38, 50, 69, 69, 75, 90, 3],
                    backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                    borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }, {
                    label: 'Anger',
                    data: [15, 28, 45, 49, 39, 25, 3, 90],
                    backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                    borderColor: '#dd1144',// array should have same number of elements as number of dataset
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    data: Array<number>;
    nowDate: Date;
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
    save() {
        //this.presentAlertConfirm("Something is <b>very</b> wrong - 0x2", "We failed to save locally. The best thing you can do right now is <s>cry</s>restart the app.");

        //this.presentAlert("Networking Error",  "I think you're offline. If you aren't then my server is down. If this issue persists, <a href=\"mailto:schwarz.abbas@gmail.com\">tell me</a>. This app will now proceed to attempt to save to local-storage.");
        console.log("Attempting save");
        this.data = [this.happy, this.angry, this.stressy, this.energy, this.worry];
        try {
            
            this.http.post('https://localhost:8080/addtolog', {
                content: 'hello',
                submittedBy: '8057'
            }).subscribe((response) => {
                console.log(response);
            });
        }
        catch (error) {
            this.presentAlert("Networking Error - 0x01", "I think you're offline. If you aren't then my server is down. If this issue persists, <a href=\"mailto:schwarz.abbas@gmail.com\">tell me</a>. This app will now proceed to attempt to save to local-storage.");

            try {
                this.nowDate = new Date();
                this.nativeStorage.setItem(this.nowDate.toString(), this.data)
                    .then(
                        () => console.log('Stored item!'),
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
        


    }
}