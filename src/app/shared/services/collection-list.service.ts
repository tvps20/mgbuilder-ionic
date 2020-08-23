import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, empty, from, of } from 'rxjs';
import { map, switchMap, mapTo, tap } from 'rxjs/operators';

import { CardDTO } from './../models/card.dto';
import { CollectionDTO } from './../models/collection.dto';
import { CacheService } from './cache.service';

@Injectable({
    providedIn: 'root'
})
export class CollectionListService {

    private storageKey = 'collections';

    constructor(protected storage: Storage,
        private cacheService: CacheService) { }

    private getStorage(): Observable<CollectionDTO[]> {
        const newKey = ((collections: CollectionDTO[]) => from(this.storage.set(this.storageKey, collections)).pipe(
            mapTo(collections)
        ));

        return from(this.storage.get(this.storageKey)).pipe(
            switchMap((collectionsStorage: CollectionDTO[]) => {
                let collections: CollectionDTO[] = [];
                return collectionsStorage ? of(collectionsStorage) : newKey(collections);
            })
        );
    }

    public findAll() {
        return this.getStorage().pipe(tap(console.log));
    }

    public findBySetCode(setId: string): Observable<CollectionDTO> {
        return this.getStorage().pipe(
            map((collectionsBd: CollectionDTO[]) => {
                let indexCollection = collectionsBd.findIndex(x => x.set.code === setId);

                if (indexCollection != -1) {
                    return collectionsBd[indexCollection];
                }

                else empty();
            })
        );
    }

    public saveOrRemove(card: CardDTO, insert: boolean = true) {
        return this.getStorage().pipe(
            switchMap((collectionsBd: CollectionDTO[]) => {
                let indexCollection = collectionsBd.findIndex(x => x.set.code === card.set);

                if (indexCollection != -1) {
                    let indexCard = collectionsBd[indexCollection].cardsItens.findIndex(x => x.card.id === card.id);

                    if (insert) {
                        if (indexCard === -1) {
                            collectionsBd[indexCollection].cardsItens.push({ card: card, qtd: 1 });
                        }
                    } else {
                        if (indexCard != -1) {
                            collectionsBd[indexCollection].cardsItens.splice(indexCard, 1);
                        }
                    }

                } else {
                    let collection = this.cacheService.findCollectionApiByCode(card.set);
                    if (collection) {
                        collection.cardsItens = [];
                        collection.cardsItens.push({ card: card, qtd: 1 });
                        collectionsBd.push(collection);
                    }
                }

                return from(this.storage.set(this.storageKey, collectionsBd));
            })
        );
    }
}


