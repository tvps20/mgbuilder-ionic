import { catchError } from 'rxjs/operators';
import { Observable, of, Subject, empty } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { SetDTO } from './../../shared/models/set.dto';
import { SetService } from './../../shared/services/domain/set.service';
import { CacheService } from './../../shared/services/cache.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.page.html',
  styleUrls: ['./sets.page.scss'],
})
export class SetsPage implements OnInit {

  public sets$: Observable<SetDTO[]>;
  public setsError$ = new Subject<boolean>();

  constructor(private cacheService: CacheService,
    private setService: SetService) { }

  ngOnInit() {
    this.sets$ = this.loadSets();
  }

  private loadSets(){
    if(this.cacheService.setsApi.length > 0){
      return of(this.cacheService.setsApi);
    } else {
      return this.setService.findAll().pipe(
        catchError(error => {
          this.setsError$.next(true);
          return empty();
        })
      );
    }
  }
}
