import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
    }
    view: CalendarView = CalendarView.Month;

    viewDate: Date = new Date();

    events: CalendarEvent[] = [];

}
