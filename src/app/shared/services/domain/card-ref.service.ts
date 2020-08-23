import { FormGroup } from '@angular/forms';
import { switchMap, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Observable } from 'rxjs';

import { CardDTO } from './../../models/card.dto';
import { CardRefDTO } from './../../models/card-ref.dto';
import { CardRefType } from './../../util/enuns-type.enum';
import { BdBaseCrudService } from '../../util/bd-base-crud';

@Injectable({
    providedIn: 'root'
})
export class CardRefService extends BdBaseCrudService<CardRefDTO> {

    constructor(protected storage: Storage) {
        super(storage, 'cardsRef')
    }

    public saveOrRemove(obj: CardRefDTO, insert: boolean = true): Observable<any> {
        return this.getStorage().pipe(
            switchMap((cardsBd: CardRefDTO[]) => {
                let index = cardsBd.findIndex(x => x.cardId === obj.cardId);

                if (index != -1) {
                    cardsBd.splice(index, 1);
                }

                cardsBd.push(obj);

                return from(this.storage.set(this.storageKey, cardsBd));
            })
        );
    }

    public saveOrUpdate(cardRef: CardRefDTO) {
        return this.getStorage().pipe(
            switchMap((cardsBd: CardRefDTO[]) => {
                let index = cardsBd.findIndex(x => x.cardId === cardRef.cardId);

                if (index != -1) {
                    cardsBd.splice(index, 1);
                }

                cardsBd.push(cardRef);

                return from(this.storage.set(this.storageKey, cardsBd));
            })
        );
    }

    public findByCardId(cardId: string) {
        return from(this.getStorage()).pipe(
            map((cardsBd: CardRefDTO[]) => {
                if (cardsBd) {
                    let cardsRefList = cardsBd.filter(x => x.cardId === cardId);

                    if (cardsRefList.length > 0) {
                        return cardsRefList[0];
                    }

                    return null;
                }
            })
        );
    }

    public getSelectCardRef(cardId: string) {
        return this.findByCardId(cardId).pipe(
            switchMap((cardRef: CardRefDTO) => {
                let select: string[] = [];

                if (cardRef) {
                    if (cardRef.collection) {
                        select.push(CardRefType.COLLECTION);
                    }
                    if (cardRef.favorite) {
                        select.push(CardRefType.FAVORITE);
                    }
                    if (cardRef.wantList) {
                        select.push(CardRefType.WANTLIST);
                    }

                    cardRef.decksIds.split(';').forEach(x => {
                        if (x !== '') {
                            select.push(x);
                        }
                    });
                }

                return of(select);
            })
        );
    }

    public parseToEntity(form: FormGroup, card: CardDTO): CardRefDTO {
        let select: string[] = form.get('add').value || [];
        let collection = false;
        let favorite = false;
        let wantList = false;
        let decksIds: string = '';

        select.forEach(x => {
            switch (x) {
                case (CardRefType.COLLECTION): {
                    collection = true;
                    break;
                }
                case (CardRefType.FAVORITE): {
                    favorite = true;
                    break;
                }
                case (CardRefType.WANTLIST): {
                    wantList = true;
                    break;
                }
                default: {
                    decksIds = decksIds.concat(x + ';')
                    break;
                }
            }
        })


        return {
            created_at: new Date(),
            update_at: new Date(),
            cardId: card.id,
            collection: collection,
            favorite: favorite,
            wantList: wantList,
            decksIds: decksIds
        };
    }
}