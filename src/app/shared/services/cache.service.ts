import { Injectable } from '@angular/core';

import { SetDTO } from './../models/set.dto';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    public setsApi: SetDTO[] = [];
    public setsApiFullLength: number = 0;
    public cardsApiSetLength: number = 0;

    public selectedSet: SetDTO;
}