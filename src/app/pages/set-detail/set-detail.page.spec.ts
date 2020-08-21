import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetDetailPage } from './set-detail.page';

describe('SetDetailPage', () => {
  let component: SetDetailPage;
  let fixture: ComponentFixture<SetDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
