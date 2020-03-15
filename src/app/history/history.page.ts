import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, TimeUnit } from 'chart.js';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    constructor(private nativeStorage: NativeStorage) { }
    @ViewChild('lineCanvas') barChart;
  ngOnInit() {

  }
    ionViewDidEnter() {
        this.keyParse();
        this.createLineChart();
    }
    bars: any;
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
                    },]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',

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
    happiness: any = [];
    anger: any = [];
    stress: any = [];
    energy: any = [];
    worry: any = [];
    dates: any = [];

    keyParse() {
        this.happiness = [];
        this.anger = [];
        this.stress = [];
        this.energy = [];
        this.worry = [];
        var dates = JSON.parse(localStorage.getItem("data")).dates;
        console.log(dates);
        var data = JSON.parse(localStorage.getItem("data")).data;
        console.log(data);
        for (var i = 0; i < dates.length; i++) {
                this.happiness.push(data[i][0]);
                this.anger.push(data[i][1]);
                this.stress.push(data[i][2]);
                this.energy.push(data[i][3]);
                this.worry.push(data[i][4]);
                this.dates.push(dates[i]);

        }
        this.createLineChart();
    }
    happinessKey() {
        let list = [];
        for (var i = 0; i < this.happiness.length; i++) {
            list.push({ x: this.dates[i], y: this.happiness[i] });
        }
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
        for (var i = 0; i < this.energy.length; i++) {
            list.push({ x: this.dates[i], y: this.energy[i] });
        }
        return list;
    }
    worryKey() {
        let list = [];
        for (var i = 0; i < this.worry.length; i++) {
            list.push({ x: this.dates[i], y: this.worry[i] });
        }
        return list;
    }
}
