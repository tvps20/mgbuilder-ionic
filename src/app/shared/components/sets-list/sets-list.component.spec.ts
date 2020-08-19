import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetsListComponent } from './sets-list.component';

describe('SetsListComponent', () => {
  let component: SetsListComponent;
  let fixture: ComponentFixture<SetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
