import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { CardDTO } from './../../models/card.dto';
import { UtilService } from './../../services/util.service';
import { CacheService } from './../../services/cache.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {

  @Input() cardsError$ = new Subject<boolean>();
  @Input() cardsList$: CardDTO[];
  @Input() basePath: string = "./sets";

  constructor(private utilService: UtilService,
    private cacheService: CacheService,
    private router: Router) { }

  ngOnInit() { }

  styleBorderCard(card: CardDTO) {
    return this.utilService.cardBorderStyle(card);
  }

  makeManaCost(manaCost: string) {
    return this.utilService.makeManaCost(manaCost);
  }

  public goToCardDetail(card: CardDTO, index: number) {
    this.cacheService.selectedCardDetail = card;
    this.cacheService.selectedCardIndex = index;
    this.router.navigate([`${this.basePath}/${card.set}/cards`, card.id]);
  }
}
