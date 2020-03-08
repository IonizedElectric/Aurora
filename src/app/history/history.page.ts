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
        this.createLineChart();
    }
    bars: any;
    createLineChart() {

        this.getAll()
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
                        data: this.energy,
                        backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
                        borderColor: '#ffff00',// array should have same number of elements as number of dataset
                        borderWidth: 1
                    }, {
                        label: 'Worry',
                        data: this.worry,
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
    getAll() {
        this.nativeStorage.keys().then(
            r => this.loop(r)
        )

        
    }
    happiness: any;
    anger: any;
    stress: any;
    energy: any;
    worry: any;

    loop(r) {
        this.happiness = [];
        this.anger = [];
        this.stress = [];
        this.energy = [];
        this.worry = [];
        for (var i = 0; i < r.length; i++) {
            let date = new Date(r[i]);
            this.happiness.push({ x: date, y: this.nativeStorage.getItem(r[i])[0] });
            this.anger.push({ x: date, y: this.nativeStorage.getItem(r[i])[1] });
            this.stress.push({ x: date, y: this.nativeStorage.getItem(r[i])[2] });
            this.energy.push({ x: date, y: this.nativeStorage.getItem(r[i])[3] });
            this.worry.push({ x: date, y: this.nativeStorage.getItem(r[i])[4] });

        }
    }
}
