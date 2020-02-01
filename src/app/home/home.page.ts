import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { from, defer } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
    constructor(/*private http: HTTP*/) { }
    happy: number;
    angry: number;
    stressy: number;
    energy: number;
    worry: number;
    save() {
         
        //return defer(() => from(this.http.get('http://86.189.204.124:8080/save', 'data', '')))
          //  .pipe(
            //    map(resp => { return resp }));
        console.log("Happiness: " + this.happy.toString() + "\n" +
            "Anger: " + this.angry.toString() + "\n" +
            "Stress: " + this.stressy.toString() + "\n" +
            "Energy: " + this.energy.toString() + "\n" +
            "Worry: " + this.worry.toString());
        //this.nativeStorage.setItem(new Date(), {property: values, anotherProperty: 'anotherValue'}).then(() => console.log('Stored item!'),error => console.error('Error storing item', error));
  }
  ngOnInit() {
  }
    

}
