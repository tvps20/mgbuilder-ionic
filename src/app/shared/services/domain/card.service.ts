import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { CardDTO } from './../../models/card.dto';
import { API_CONFIG } from './../../config/api.config';
import { CacheService } from './../cache.service';
import { ApiBaseCrudService } from '../../util/api-base-crud';

@Injectable({
    providedIn: 'root'
})
export class CardService extends ApiBaseCrudService<CardDTO> {

    constructor(public http: HttpClient,
        private cacheService: CacheService) {
        super();
    }

    public findAll(): Observable<CardDTO[]> {
        return this.http.get<any[]>(`${API_CONFIG.baseUrl}/sets`).pipe(
            map((dados: any) => dados.cards)
        );
    }

    public findAllBySet(code: string, page: number = 1, pageSize: number = 24): Observable<CardDTO[]> {
        return this.http.get<any[]>(`${API_CONFIG.baseUrl}/cards?page=${page}&pageSize=${pageSize}&set=${code}`, { observe: 'response' }).pipe(
            tap((res) => this.cacheService.selectedSetLengthCards = Number.parseInt(res.headers.get('total-count'))),
            map((res: any) => res.body),
            map((dados: any) => dados.cards)
        );
    }

    public findById(id: string): Observable<CardDTO> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/cards/${id}`).pipe(
            map((dados: any) => dados.cards[0])
        );
    }
}