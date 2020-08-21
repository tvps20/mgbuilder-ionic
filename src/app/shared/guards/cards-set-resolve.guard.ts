import { SetDTO } from './../models/set.dto';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, empty, of } from 'rxjs';

import { CardDTO } from '../models/card.dto';
import { CollectionDTO } from '../models/collection.dto';
import { CacheService } from '../services/cache.service';
import { PageService } from '../services/page.service';
import { CardService } from '../services/domain/card.service';

@Injectable({
  providedIn: 'root'
})
export class CardsSetResolveGuard implements Resolve<CardDTO[]> {

  constructor(private cardService: CardService,
    private cacheService: CacheService,
    private router: Router,
    private pageService: PageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CardDTO[]> {
    const code = route.params['code'];
    const setDefaul: SetDTO = { code: code, name: code, block: code, booster: [], releaseDate: new Date(), type: code, onlineOnly: false }
    const findBySet = (param) => this.cardService.findAllBySet(param).pipe(
      tap(cards => {
        let collection: CollectionDTO = {
          set: this.cacheService.selectedSet || setDefaul,
          cards: cards,
          qtdTotalCards: this.cacheService.selectedLengthSet
        };
        this.cacheService.saveCollectionApi(collection);
        this.cacheService.selectedCollection = collection;
      }),
      catchError(error => {
        this.router.navigate(['/sets']);
        return empty();
      })
    );
    const verifySetCache = (param) => {
      let collection = this.cacheService.findCollectionApiByCode(param);

      if (collection) {
        this.cacheService.selectedCollection = collection;
        return of(collection.cards);
      }

      return findBySet(param);
    }

    return this.pageService.presentLoading().pipe(
      switchMap((loading) => {
        const disableLoading = () => loading.dismiss();
        return code ? verifySetCache(code).pipe(tap(disableLoading)) : empty().pipe(tap(disableLoading))
      }),
    );
  }
}
