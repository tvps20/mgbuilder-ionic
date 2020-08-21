import { Injectable } from '@angular/core';

import { SetDTO } from './../models/set.dto';
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

    public findCollectionApiByCode(code: string) {
        let collection = this.collectionsApi.filter(x => x.set.code === code);
        if (collection.length > 0) {
            return collection[0];
        }

        return null;
    }

    public saveCollectionApi(collection: CollectionDTO) {
        return this.collectionsApi.push(collection);
    }
}