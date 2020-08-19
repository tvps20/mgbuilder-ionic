import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertInfoComponent } from './alert-info.component';

describe('AlertInfoComponent', () => {
  let component: AlertInfoComponent;
  let fixture: ComponentFixture<AlertInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
