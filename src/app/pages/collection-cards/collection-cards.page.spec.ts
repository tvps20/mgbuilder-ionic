import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollectionCardsPage } from './collection-cards.page';

describe('CollectionCardsPage', () => {
  let component: CollectionCardsPage;
  let fixture: ComponentFixture<CollectionCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionCardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
