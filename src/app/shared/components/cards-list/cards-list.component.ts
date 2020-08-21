import { Observable, Subject } from 'rxjs';
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
  @Input() cardsList$: any

  constructor(private utilService: UtilService) { }

  ngOnInit() {}

  styleBorderCard(card: CardDTO){
    return this.utilService.cardBorderStyle(card);
  }

  makeManaCost(manaCost: string){
    return this.utilService.makeManaCost(manaCost);
  }
}
