import { CacheService } from './../shared/services/cache.service';
import { Subject, empty, Observable, of } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { SetDTO } from './../shared/models/set.dto';
import { DeckDTO } from './../shared/models/deck.dto';
import { SetService } from './../shared/services/domain/set.service';
import { DeckService } from './../shared/services/domain/deck.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  public topButtonEnable = false;
  public setsTop10$: Observable<SetDTO[]>;
  public setsError$ = new Subject<boolean>();
  public decks$: Observable<DeckDTO[]>;
  public decksError$ = new Subject<boolean>();

  constructor(private setService: SetService,
    private cacheService: CacheService,
    private deckService: DeckService) { }

  ngOnInit(): void {
    this.setsTop10$ = this.loadTop10Sets();
    this.decks$ = this.loadDecks();
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

  private loadTop10Sets() {
    if(this.cacheService.setsApi.length > 0){
      return of(this.cacheService.setsApi).pipe(
        map(sets => sets.slice(0, 10))
      );
    } else {
      return this.setService.findTop10().pipe(
        catchError(error => {
          this.setsError$.next(true);
          return empty();
        })
      );
    }
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
