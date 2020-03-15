import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    constructor(private http: HttpClient, private alertController: AlertController, public router: Router) { }
    name: any;
    word: any;
  ngOnInit() {
  }
    signup() {
        this.confirm("Terms and Conditions","By signing up you agree to our <a href='https://ionizedelectric.github.io/terms'>terms and conditions. Also, please remember that this app was made by two fourteen-year-olds and has no security whatsoever, so think before use.");
    }
    signon() {
        console.log("Signup");
        this.http.get('http://aurora-django.herokuapp.com/posts/account/' + encodeURIComponent(this.name) + '/' + encodeURIComponent(this.word), { responseType: 'text' }).subscribe((data: any) => this.checkResp(data));

    }
    checkResp(text) {
        if (text == "uname") {
            this.presentAlert("Username taken", "That username is used by someone else.");
        }
        else {
            localStorage.setItem("u_id", text);
            console.log(text);
            console.log(Number(text));
            localStorage.setItem("loginState", "1");
            localStorage.setItem("settings", JSON.stringify(global));
            this.router.navigate(['/home/']);
        }
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
    async confirm(header1, message) {
        const alert = await this.alertController.create({
            header: header1,
            message: message,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                    
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                }
            ]
        });

        await alert.present();
    }
}
