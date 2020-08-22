import { Storage } from '@ionic/storage';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DeckDTO } from './../../models/deck.dto';
import { BdBaseCrudService } from '../../util/bd-base-crud'


@Injectable({
    providedIn: 'root'
})
export class DeckService extends BdBaseCrudService<DeckDTO> {

    constructor(protected storage: Storage) {
        super(storage, 'decks')
    }

    public findAll(): Observable<DeckDTO[]> {
        return this.getStorage().pipe(switchMap(() => of([
            { id: '1', created_at: new Date(), update_at: new Date(), name: "mardu tokens", format: "morden", colors: ["ms-r", "ms-w", "ms-b"], favorite: true },
            { id: '2', created_at: new Date(), update_at: new Date(), name: "BW life", format: "morden", colors: ["ms-w", "ms-b"], favorite: false },
            { id: '3', created_at: new Date(), update_at: new Date(), name: "Rakdos ameaçar", format: "morden", colors: ["ms-r", "ms-b"], favorite: false },
            { id: '4', created_at: new Date(), update_at: new Date(), name: "Queen Marchesa", format: "Commander", colors: ["ms-r", "ms-w", "ms-b"], favorite: false },
            { id: '5', created_at: new Date(), update_at: new Date(), name: "Boros Monarca", format: "Pauper", colors: ["ms-r", "ms-w"], favorite: false },
            { id: '6', created_at: new Date(), update_at: new Date(), name: "Pestilencia", format: "Pauper", colors: ["ms-w", "ms-b"], favorite: false },
            { id: '7', created_at: new Date(), update_at: new Date(), name: "Soul sisters", format: "morden", colors: ["ms-w", "ms-b"], favorite: false }
        ])));
    }

    public saveOrRemove(obj: DeckDTO, insert: boolean): Observable<any> {
        throw new Error("Method not implemented.");
    }
}