import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

    constructor(public alertController: AlertController) { }

  ngOnInit() {
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
    title: string;
    sub: string;
    content: string;
    save() {
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
        }
    }
}
