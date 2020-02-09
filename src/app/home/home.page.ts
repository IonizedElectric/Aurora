import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { from, defer } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],

})

export class HomePage implements OnInit {
    constructor(private http: HTTP, public alertController: AlertController, private nativeStorage: NativeStorage) { }
    ngOnInit() {
    }
    happy: number;
    angry: number;
    stressy: number;
    energy: number;
    worry: number;
    data: Array<number>;
    nowDate: Date;
    async  presentAlert(head, sub, msg) {
        const alert = await this.alertController.create({
            header: head,
            subHeader: sub,
            message: msg,
            buttons: ['OK']
        });
    }
    save() {
        this.presentAlert("Networking Error", "Error 0x1", "I think you're offline. If you aren't then my server is down. If this issue persists, <a href=\"mailto:schwarz.abbas@gmail.com\">tell me</a>. This app will now proceed to attempt to save to local-storage.");

        this.data = [this.happy, this.angry, this.stressy, this.energy, this.worry];
        try {
            
            return defer(() => from(this.http.get('http://86.189.204.124:8080/save', this.data, '')))
                .pipe(
                    map(resp => { return resp }));
        }
        catch (error) {
            this.presentAlert("Networking Error", "Error 0x1", "I think you're offline. If you aren't then my server is down. If this issue persists, <a href=\"mailto:schwarz.abbas@gmail.com\">tell me</a>. This app will now proceed to attempt to save to local-storage.");

            try {
                this.nowDate = new Date();
                this.nativeStorage.setItem(this.nowDate.toString(), this.data)
                    .then(
                        () => console.log('Stored item!'),
                        error => console.error('Error storing item', error)
                    );
            }
            catch(error){
                this.presentAlert("Something is <b>very</b> wrong", "Error 0x2", "We failed to save locally. The best thing you can do rigt now is restart the app.");
            }
            /*
            console.log("Happiness: " + this.happy.toString() + "\n" +
                "Anger: " + this.angry.toString() + "\n" +
                "Stress: " + this.stressy.toString() + "\n" +
                "Energy: " + this.energy.toString() + "\n" +
                "Worry: " + this.worry.toString());*/
            //this.nativeStorage.setItem(new Date(), {property: values, anotherProperty: 'anotherValue'}).then(() => console.log('Stored item!'),error => console.error('Error storing item', error));
        };
        


    }
}