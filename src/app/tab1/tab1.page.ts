import { Subject, empty, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { SetDTO } from './../shared/models/set.dto';
import { DeckDTO } from './../shared/models/deck.dto';
import { SetService } from './../shared/services/domain/set.service';
import { DeckService } from './../shared/services/domain/deck.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public setsTop10$: Observable<SetDTO[]>;
  public setsError$ = new Subject<boolean>();
  public decks$: Observable<DeckDTO[]>;
  public decksError$ = new Subject<boolean>();

  constructor(private setService: SetService,
    private deckService: DeckService) { }

  ngOnInit(): void {
    this.setsTop10$ = this.loadSets();
    this.decks$ = this.loadDecks();
  }

  private loadSets() {
    return this.setService.findTop10().pipe(
      catchError(error => {
        this.setsError$.next(true);
        return empty();
      })
    );
  }

  private loadDecks() {
    return this.deckService.findAll().pipe(
      catchError(error => {
        this.decksError$.next(true);
        return empty();
      })
    );
  }
}
