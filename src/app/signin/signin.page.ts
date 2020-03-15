import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

    constructor(private http: HttpClient, private alertController: AlertController, private router: Router) { }
    name: string;
    word: string;
    ngOnInit() {
        if (localStorage.getItem("loginState") != null || localStorage.getItem("loginState") == "0") {
            this.router.navigate(['/home/'])
        }
    }
    login() {
        console.log("login");
        this.http.get('http://aurora-django.herokuapp.com/posts/login/' + encodeURIComponent(this.name) + '/' + encodeURIComponent(this.word), { responseType: 'text' }).subscribe((val: any) => this.checkResp(val));
    }
    checkResp(text) {
        console.log("Checkresp" + text);
        if (text == "nope") {
            this.presentAlert("Incorrect Credentials", "Have you got an account? If not, sign up.");
        }
        else {
            console.log(text);
            console.log(Number(text));
            localStorage.setItem("u_id",text);
            localStorage.setItem("loginState", "1");
            //localStorage.setItem("settings", JSON.stringify(global));
            this.router.navigate(['/home/'])
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
}
