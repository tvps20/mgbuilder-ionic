import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CardDTO } from './../../models/card.dto';
import { Component, OnInit, Input } from '@angular/core';

import { UtilService } from './../../services/util.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {

  @Input() cardsError$ = new Subject<boolean>();
  @Input() cardsList$: CardDTO[];
  @Input() initPathRoute: string = "/tabs/tab1";

  constructor(private utilService: UtilService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { }

  styleBorderCard(card: CardDTO) {
    return this.utilService.cardBorderStyle(card);
  }

  makeManaCost(manaCost: string) {
    return this.utilService.makeManaCost(manaCost);
  }

  public goToCardDetail(card: CardDTO, index: number) {
    this.router.navigate([`sets/${card.set}/cards`, card.id]);
  }
}
