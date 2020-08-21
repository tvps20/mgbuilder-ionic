import { PageService } from './../../shared/services/page.service';
import { CardService } from './../../shared/services/domain/card.service';
import { FormGroup } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';
import { CardDTO } from './../../shared/models/card.dto';
import { CacheService } from './../../shared/services/cache.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit,  OnDestroy {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  public setTitle: string = "Set Detail"
  public topButtonEnable = false;
  public formulario: FormGroup;
  public cardsFullLength: number = 0;
  private subscriptions$: Subscription[] = [];
  public cards$: Observable<CardDTO[]>;
  private localCards: CardDTO[] = [];
  private page: number = 1;

  constructor(private cacheService: CacheService,
    private pageService: PageService,
    private cardService: CardService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTitle();
    this.localCards = this.route.snapshot.data['cards'];
    this.cardsFullLength = this.cacheService.selectedLengthSetCards;
    this.cards$ = of(this.localCards);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  logScrolling(event: CustomEvent) {
    if (event.detail.scrollTop > 250) {
      this.topButtonEnable = true;
    } else {
      this.topButtonEnable = false;
    }
  }

  loadData(event) {
    this.page++;
    const code = this.route.snapshot.params['code'];
    const subscription = this.cardService.findAllBySet(code, this.page).pipe().subscribe(
      success => {
        event.target.complete();
        this.localCards = this.localCards.concat(success);
        if (this.localCards.length >= this.cardsFullLength) { event.target.disabled = true; }
        this.cards$ = of(this.localCards);
        this.cacheService.selectedCollection.cards = this.localCards;
      },
      error => {
        this.pageService.presentToast("Error getting cards!!!", 'danger');
        event.target.complete();
        this.page--;
      }
    );

    this.subscriptions$.push(subscription);
  }

  private getTitle() {
    if (this.cacheService.selectedSet) {
      this.setTitle = this.cacheService.selectedSet.name;
    }
  }
}
