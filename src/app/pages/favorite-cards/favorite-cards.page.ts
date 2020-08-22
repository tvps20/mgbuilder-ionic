import { CacheService } from './../../shared/services/cache.service';
import { SetDTO } from './../../shared/models/set.dto';
import { CollectionDTO } from './../../shared/models/collection.dto';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CardDTO } from './../../shared/models/card.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-cards',
  templateUrl: './favorite-cards.page.html',
  styleUrls: ['./favorite-cards.page.scss'],
})
export class FavoriteCardsPage implements OnInit {

  public favoriteCards$: Observable<CardDTO[]>;
  private favoriteCards: CardDTO[];
  private changeContent = false;
  

  constructor(private route: ActivatedRoute,
    private cacheService: CacheService) { }

  ngOnInit() {
    this.loadFavorites();
    this.cacheService.selectedCollection = this.createCollection();
  }

  ionViewWillEnter(event) {
    this.changeContent = !this.changeContent;
    this.loadFavorites();
  }

  private loadFavorites(){
    this.favoriteCards = this.route.snapshot.data['favorites'];
    this.favoriteCards$ = of(this.favoriteCards);
  }

  private createCollection(): CollectionDTO{
    let set: SetDTO = {name: 'Favorite', code: 'Favorite', block: 'Favorite', booster: [], onlineOnly: false, releaseDate: new Date(), type: 'Favorite' }
    return {set: set, cards: this.favoriteCards, qtdTotalCards: this.favoriteCards.length }
  }
}
