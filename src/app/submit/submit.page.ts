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
    posterID = 4;
    list: Array<string>;
    happy: number;
    angry: number;
    stressy: number;
    energy: number;
    worry: number;
    res: any;
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
        console.log(this.list);
        if (this.title == null || this.title == "") {
            this.presentAlert("Uncompleted fields", "Please complete the Title field!");
        }
        else if (this.sub == null || this.sub == "") {
            this.presentAlert("Uncompleted fields", "Please complete the Subtitle field!");
        }
        else if (this.content == null || this.content == "") {
            this.presentAlert("Uncompleted fields", "Please complete the Content field!");
        } else {
            try {
                if (this.list.length == 0) {
                    console.log(this.list);
                    throw "empty list";
                }
                console.log("Gothere");
                //this.presentAlert("Well done!", "Your suggestion has (not) been submitted.");
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
                console.log("madeit");
                var temp2 = true;
            }
            
            catch{ this.presentAlert("Uncompleted fields", "Please complete the list!"); }
            if (temp2) {
                this.makePost();
            }
        }
    }
    makePost() {

       var temp = ('http://aurora-django.herokuapp.com/posts/make/' + encodeURIComponent(this.title) + `/` + (this.posterID).toString() + '/' + encodeURIComponent(this.sub) + '/' + encodeURIComponent(this.content) + '/' + this.happy.toString() + '/' + this.angry.toString() + `/` + this.stressy.toString() + `/` + this.energy.toString() + '/' + this.worry.toString());
        console.log(temp);
        var temp3;
        
            /*
            temp3 = this.http.get(temp).subscribe(HttpErrorResponse => {
                console.log("this" + HttpErrorResponse.toString());
            })*/
        this.http.get(temp, { responseType: 'text' }).toPromise()
                .then(r => console.log('response', r)).catch(error => console.error(error));

        console.log("Temp3:");
        console.log(temp3);
        this.presentAlert("Well done!", "Your suggestion has (not) been submitted.");
        //console.log(this.res.error.error.text);
    }
    logLog(value) {
        this.list = value;
    }
}
