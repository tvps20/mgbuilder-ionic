import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { DeckDTO } from './../../shared/models/deck.dto';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-decks-list',
  templateUrl: './decks-list.component.html',
  styleUrls: ['./decks-list.component.scss'],
})
export class DecksListComponent implements OnInit {

  @Input() decks$: Observable<DeckDTO[]>;
  @Input() decksError$ = new Subject<boolean>();

  constructor(private utilService: UtilService) { }

  ngOnInit() { }

  styleBorderDeck(){
    return this.utilService.cardBorderStyle();
  }

  setFavoriteDeck(deck: DeckDTO){
    deck.favorite = !deck.favorite;
  }
}
