import { CollectionDTO } from './../models/collection.dto';
import { Injectable } from '@angular/core';

import { SetDTO } from './../models/set.dto';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    private collectionsApi: CollectionDTO[] = [];
    public setsApi: SetDTO[] = [];
    public setsApiFullLength: number = 0;
    
    public selectedSet: SetDTO;
    public selectedSetLengthCards: number = 0;
    public selectedCollection: CollectionDTO;

    public findCollectionApiByCode(code: string) {
        console.log(this.collectionsApi)
        let collection = this.collectionsApi.filter(x => x.set.code === code);
        if (collection.length > 0) {
            return collection[0];
        }

        return null;
    }

    public saveCollectionApi(collection: CollectionDTO) {
        if(!collection.set){
            collection.set = {code: 'defaul', name: 'defaul', block: null, booster: [], onlineOnly: null, releaseDate: new Date(), type: null }
        }
        
        return this.collectionsApi.push(collection);
    }

    public updateCollectionApi(code: string, collection: CollectionDTO){
        let collectionSave = this.findCollectionApiByCode(code);

        if (collectionSave) {
            return this.updateData(collection, collectionSave);
        }
    }

    private updateData(newObj: CollectionDTO, obj: CollectionDTO) {
        obj.cards = newObj.cards.length > obj.cards.length ? newObj.cards : obj.cards;
        obj.qtdTotalCards = newObj.qtdTotalCards > obj.qtdTotalCards ? newObj.qtdTotalCards : obj.qtdTotalCards;
    }
}