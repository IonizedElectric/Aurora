import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForYouPage } from './for-you.page';

describe('ForYouPage', () => {
  let component: ForYouPage;
  let fixture: ComponentFixture<ForYouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForYouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
