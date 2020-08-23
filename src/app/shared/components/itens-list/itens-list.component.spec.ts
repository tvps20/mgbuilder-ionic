import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItensListComponent } from './itens-list.component';

describe('ItensListComponent', () => {
  let component: ItensListComponent;
  let fixture: ComponentFixture<ItensListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
