import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SetDTO } from './../../models/set.dto';
import { API_CONFIG } from '../../config/api.config';
import { CacheService } from '../cache.service';
import { ApiBaseCrudService } from '../../util/api-base-crud';

@Injectable({
    providedIn: 'root'
})
export class SetService extends ApiBaseCrudService<SetDTO>{

    constructor(public http: HttpClient,
        private cacheService: CacheService) {
        super();
    }

    public findAll(): Observable<SetDTO[]> {
        return this.http.get<any[]>(`${API_CONFIG.baseUrl}/sets`, { observe: 'response' }).pipe(
            tap((res) => this.cacheService.setsApiFullLength = Number.parseInt(res.headers.get('total-count'))),
            map((res: any) => res.body),
            map(x => x.sets.sort((a, b) => a.releaseDate < b.releaseDate ? 1 : -1)),
            tap(dados => this.cacheService.setsApi = dados),
        );
    }

    public findById(id: string): Observable<SetDTO> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/sets/${id}`).pipe(
            map((dados: any) => dados.sets[0])
        );
    }

    public findTop10(): Observable<SetDTO[]> {
        return this.findAll().pipe(
            map(dados => dados.slice(0, 10))
        );
    }
}