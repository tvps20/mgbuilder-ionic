import { switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { CardDTO } from './../../shared/models/card.dto';
import { PageService } from './../services/page.service';
import { FavoriteListService } from '../services/favorite-list.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteResolveGuard implements Resolve<CardDTO[]> {

  constructor(private favoriteService: FavoriteListService,
    public pageService: PageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CardDTO[]> {

    const findAllFavorites = () => this.favoriteService.findAll();

    return this.pageService.presentLoading().pipe(
      switchMap((loading) => {
        const disableLoading = () => loading.dismiss();
        return findAllFavorites().pipe(tap(disableLoading));
      }),
    );
  }
}
