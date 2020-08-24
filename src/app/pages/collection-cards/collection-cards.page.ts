import { catchError } from 'rxjs/operators';
import { Observable, Subject, empty } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { CardItemDTO } from './../../shared/models/card-item.dto';
import { CollectionDTO } from './../../shared/models/collection.dto';
import { WantListService } from './../../shared/services/want-list.service';
import { CollectionListService } from './../../shared/services/collection-list.service';

@Component({
  selector: 'app-collection-cards',
  templateUrl: './collection-cards.page.html',
  styleUrls: ['./collection-cards.page.scss'],
})
export class CollectionCardsPage implements OnInit {

  public collections$: Observable<CollectionDTO[]>;
  public collectionError$ = new Subject<boolean>();
  public wantList$: Observable<CardItemDTO[]>;
  public wantError$ = new Subject<boolean>();

  constructor(private collectionService: CollectionListService,
    private wantListService: WantListService) { }

  ngOnInit() {
    this.collections$ = this.loadCollection();
    this.wantList$ = this.loadWantList();
  }

  private loadCollection() {
    return this.collectionService.findAll().pipe(
      catchError(error => {
        this.collectionError$.next(true);
        return empty();
      })
    );
  }

  private loadWantList() {
    return this.wantListService.findAll().pipe(
      catchError(error => {
        this.wantError$.next(true);
        return empty();
      })
    );
  }
}
