import { Injectable } from '@angular/core';

import { SetDTO } from './../models/set.dto';
import { CardDTO } from './../models/card.dto';
import { CollectionDTO } from './../models/collection.dto';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    private collectionsApi: CollectionDTO[] = [];
    public setsApi: SetDTO[] = [];
    public setsApiFullLength: number = 0;

    public selectedSet: SetDTO;
    public selectedLengthSetCards: number = 0;
    public selectedCollection: CollectionDTO;
    public selectedCardDetail: CardDTO;
    public selectedCardIndex: number;

    public findCollectionApiByCode(code: string) {
        let collection = this.collectionsApi.filter(x => x.set.code === code);
        if (collection.length > 0) {
            return collection[0];
        }

        return null;
    }

    public saveOrUpdateCollectionApi(collection: CollectionDTO) {
        let collectionBd = this.collectionsApi.findIndex(x => x.set.code === collection.set.code);

        if(collectionBd){
            this.collectionsApi[collectionBd] = collection;
        }

        return this.collectionsApi.push(collection);
    }
}