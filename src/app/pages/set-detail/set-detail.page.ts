import { FormGroup } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';
import { CardDTO } from './../../shared/models/card.dto';
import { CacheService } from './../../shared/services/cache.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  public setTitle: string = "Set Detail"
  public topButtonEnable = false;
  public formulario: FormGroup;
  public subscription$: Subscription;
  public cards$: Observable<CardDTO[]>;
  private cards: CardDTO[] = [];

  constructor(private cacheService: CacheService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.cards = this.route.snapshot.data['cards'];
    this.getTitle();
    this.cards$ = of(this.cards);
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

  private getTitle() {
    if (this.cacheService.selectedSet) {
      this.setTitle = this.cacheService.selectedSet.name;
    }
  }
}
