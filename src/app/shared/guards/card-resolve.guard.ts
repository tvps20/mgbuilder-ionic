import { tap, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, empty, of } from 'rxjs';

import { CardDTO } from './../models/card.dto';
import { PageService } from './../services/page.service';
import { CardService } from './../services/domain/card.service';
import { CacheService } from './../services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class CardResolveGuard implements Resolve<CardDTO> {

  constructor(private cardService: CardService,
    private pageService: PageService,
    private router: Router,
    private cacheService: CacheService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CardDTO> {

    const id = route.params['id'];
    const findByCard = (param) => this.cardService.findById(param).pipe(
      tap(card => this.cacheService.selectedCardDetail = card),
      catchError(error => {
        let code = route.params['code'];
        this.router.navigate([`sets/${code}/cards`]);
        return empty();
      })
    );
    const verifyCache = (id) => {
      let cardCache = this.cacheService.selectedCardDetail;

      if (cardCache && cardCache.id === id) {
        this.cacheService.selectedCardDetail = cardCache;
        return of(cardCache);
      }

      return findByCard(id);
    }

    return this.pageService.presentLoading().pipe(
      switchMap((loading) => {
        const disableLoading = () => loading.dismiss();
        return id ? verifyCache(id).pipe(tap(disableLoading)) : empty().pipe(tap(disableLoading))
      }),
    );
  }
}
