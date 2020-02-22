import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

    constructor(public alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
  }
    posterID = 1;
    list: Array<string>;
    happy: number;
    angry: number;
    stressy: number;
    energy: number;
    worry: number;
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
    title: string;
    sub: string;
    content: string;
    save(value) {
        if (this.title == null || this.title == "") {
            this.presentAlert("Uncompleted fields", "Please complete the Title field!");
        }
        else if (this.sub == null || this.sub == "") {
            this.presentAlert("Uncompleted fields", "Please complete the Subtitle field!");
        }
        else if (this.content == null || this.content == "") {
            this.presentAlert("Uncompleted fields", "Please complete the Content field!");
        }
        else {
            this.presentAlert("Well done!", "Your suggestion has (not) been submitted.");
            if (this.list.indexOf("happy") >= 0) {
                this.happy = 1;
            } else {
                this.happy = 0;
            }
            if (this.list.indexOf("angry") >= 0) {
                this.angry = 1;
            } else {
                this.angry = 0;
            }
            if (this.list.indexOf("stressy") >= 0) {
                this.stressy = 1;
            } else {
                this.stressy = 0;
            }
            if (this.list.indexOf("energy") >= 0) {
                this.energy = 1;
            } else {
                this.energy = 0;
            }
            if (this.list.indexOf("worry") >= 0) {
                this.worry = 1;
            } else {
                this.worry = 0;
            }
            this.makePost()

        }
    }
    makePost() {
        return this.http.get('http://aurora-django.herokuapp.com/posts/make/' + this.title + `/` + (this.posterID).toString() + '/' + this.sub + '/' + this.content + '/' + this.happy.toString() + '/' + this.angry.toString() + `/` + this.stressy.toString() + `/` + this.energy.toString()+'/'+this.worry.toString);
    }
    logLog(value) {
        this.list = value;
    }
}
