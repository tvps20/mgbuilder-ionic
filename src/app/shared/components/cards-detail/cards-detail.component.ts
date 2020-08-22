import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import { CardDTO } from './../../models/card.dto';
import { UtilService } from './../../services/util.service';
import { CacheService } from './../../services/cache.service';
import { CollectionDTO } from './../../models/collection.dto';

@Component({
  selector: 'app-cards-detail',
  templateUrl: './cards-detail.component.html',
  styleUrls: ['./cards-detail.component.scss'],
})
export class CardsDetailComponent implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @Output() changeCard: EventEmitter<CardDTO> = new EventEmitter<CardDTO>();
  @Input() collection: CollectionDTO;
  @Input() initIndex: number = 0;
  public slideOpts: any;
  private cardSelected: CardDTO;

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    this.slideOpts = this.slideOptions();
  }

  slidePrevStart(event) {
    this.slides.getActiveIndex().then(index => {
      this.cardSelected = this.collection.cards[index];
      this.changeCard.emit(this.cardSelected);
    });
  }

  slideTransitionEnd(event) {
    this.slides.getActiveIndex().then(index => {
      this.cardSelected = this.collection.cards[index];
      this.changeCard.emit(this.cardSelected);
    });
  }

  makeBorderStyle(card: CardDTO) {
    let bordStyle = this.utilService.cardBorderStyle(card);
    return bordStyle.replace('left', 'top')
  }

  makeManaCost(manaCost: string) {
    return this.utilService.makeManaCost(manaCost);
  }

  setIconClass() {
    return this.utilService.setIconClass(this.collection.set.code);
  }

  private slideOptions() {
    return {
      initialSlide: this.initIndex,
      speed: 400
    };
  }
}
