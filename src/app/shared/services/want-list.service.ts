import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { CardItemDTO } from './../models/card-item.dto';
import { BdBaseCrudService } from '../util/bd-base-crud';

@Injectable({
    providedIn: 'root'
})
export class WantListService extends BdBaseCrudService<CardItemDTO> {

    constructor(protected storage: Storage) {
        super(storage, 'wantlist')
    }

    public saveOrRemove(obj: CardItemDTO, insert: boolean): Observable<any> {
        return this.getStorage().pipe(
            switchMap((cardsBd: CardItemDTO[]) => {
                let index = cardsBd.findIndex(x => x.card.id === obj.card.id);

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