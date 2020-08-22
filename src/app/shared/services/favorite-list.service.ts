import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Observable, from } from 'rxjs';

import { CardDTO } from './../models/card.dto';
import { BdBaseCrudService } from '../util/bd-base-crud';

@Injectable({
    providedIn: 'root'
})
export class FavoriteListService extends BdBaseCrudService<CardDTO> {

    constructor(protected storage: Storage) {
        super(storage, 'favorites')
    }

    public findAll(): Observable<CardDTO[]> {
        return this.getStorage();
    }

    public saveOrRemove(obj: CardDTO, insert: boolean): Observable<any> {
        return this.getStorage().pipe(
            switchMap((cardsBd: CardDTO[]) => {
                let index = cardsBd.findIndex(x => x.id === obj.id);

                if (insert) {
                    if (index === -1) {
                        cardsBd.push(obj);
                    }
                } else {
                    if (index != -1) {
                        cardsBd.splice(index, 1);
                    }
                }

                return from(this.storage.set(this.storageKey, cardsBd));
            })
        );
    }
}