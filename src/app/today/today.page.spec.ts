import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodayPage } from './today.page';

describe('TodayPage', () => {
  let component: TodayPage;
  let fixture: ComponentFixture<TodayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
