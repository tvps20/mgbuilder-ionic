import { IonContent } from '@ionic/angular';
import { PageService } from './../../shared/services/page.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subject, empty } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { SetDTO } from './../../shared/models/set.dto';
import { SetService } from './../../shared/services/domain/set.service';
import { CacheService } from './../../shared/services/cache.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.page.html',
  styleUrls: ['./sets.page.scss'],
})
export class SetsPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  public topButtonEnable = false;
  public sets$: Observable<SetDTO[]>;
  public setsError$ = new Subject<boolean>();
  private page: number = 1;
  private pageSize: number = 24;

  constructor(private cacheService: CacheService,
    private pageService: PageService,
    private setService: SetService) { }

  ngOnInit() {
    this.sets$ = this.loadInitSets();
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  logScrolling(event: CustomEvent) {
    if (event.detail.scrollTop > 250) {
      this.topButtonEnable = true;
    } else {
      this.topButtonEnable = false;
    }
  }

  loadData(){

  }

  private loadInitSets() {
    let setsCache = this.cacheService.setsApi;
    const findAllSets = () => this.setService.findAll().pipe(
      map(sets => sets.slice(0, this.pageSize)),
      catchError(error => {
        this.setsError$.next(true);
        return empty();
      })
    );

    return setsCache.length < 1 ? findAllSets() : of(setsCache).pipe(
      map(sets => sets.slice(0, this.pageSize)),
    );
  }
}
