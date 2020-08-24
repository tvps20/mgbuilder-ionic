import { CardRefDTO } from './../../shared/models/card-ref.dto';
import { CardRefService } from './../../shared/services/domain/card-ref.service';
import { FormGroup } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CardDTO } from './../../shared/models/card.dto';
import { CardService } from './../../shared/services/domain/card.service';
import { PageService } from './../../shared/services/page.service';
import { CacheService } from './../../shared/services/cache.service';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  public setTitle: string = "Set Detail"
  public topButtonEnable = false;
  public formulario: FormGroup;
  public cardsFullLength: number = 0;
  public cardsRef: CardRefDTO[] = [];
  public cards$: Observable<CardDTO[]>;
  private subscriptions$: Subscription[] = [];
  private code: string;
  private localCards: CardDTO[] = [];
  private page: number = 1;

  constructor(private cacheService: CacheService,
    private pageService: PageService,
    private cardRefService: CardRefService,
    private cardService: CardService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTitle();
    this.localCards = this.route.snapshot.data['cards'];
    this.code = this.route.snapshot.params['code'];
    this.cardsFullLength = this.cacheService.selectedLengthSetCards;
    this.cards$ = of(this.localCards);
    this.pageService.presentToast(`${this.cardsFullLength} cards found.`);
    this.subscriptions$.push(this.loadCardsRef());
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
  }

  ionViewWillEnter(event) {
    this.subscriptions$.push(this.loadCardsRef());
  }

  public scrollToTop() {
    this.content.scrollToTop(300);
  }

  public logScrolling(event: CustomEvent) {
    if (event.detail.scrollTop > 250) {
      this.topButtonEnable = true;
    } else {
      this.topButtonEnable = false;
    }
  }

  public doRefresh(event) {
    const inscription = this.cardService.findAllBySet(this.code, 1).subscribe(
      success => {
        event.target.complete();
        if (this.localCards.length < this.cardsFullLength) {
          this.page = 1;
          this.localCards = success;
          this.cards$ = of(this.localCards);
        }
      },
      error => {
        this.pageService.presentToast("Error getting cards!!!", 'danger');
        event.target.complete();
      }
    );

    this.subscriptions$.push(inscription);
  }

  public loadData(event) {
    this.page++;
    const inscription = this.cardService.findAllBySet(this.code, this.page).subscribe(
      success => {
        event.target.complete();
        this.localCards = this.localCards.concat(success);
        this.cards$ = of(this.localCards);
        this.cacheService.selectedCollection.cards = this.localCards;
        if (this.localCards.length >= this.cardsFullLength) { event.target.disabled = true; }
      },
      error => {
        this.pageService.presentToast("Error getting cards!!!", 'danger');
        event.target.complete();
        this.page--;
      }
    );

    this.subscriptions$.push(inscription);
  }

  private loadCardsRef() {
    return this.cardRefService.findAll().subscribe(
      success => this.cardsRef = success
    );
  }

  private getTitle() {
    if (this.cacheService.selectedSet) {
      this.setTitle = this.cacheService.selectedSet.name;
    }
  }
}
