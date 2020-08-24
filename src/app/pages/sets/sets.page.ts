import { IonContent } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, tap, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, empty, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { SetDTO } from './../../shared/models/set.dto';
import { SetService } from './../../shared/services/domain/set.service';
import { PageService } from './../../shared/services/page.service';
import { CacheService } from './../../shared/services/cache.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.page.html',
  styleUrls: ['./sets.page.scss'],
})
export class SetsPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  public topButtonEnable = false;
  public formulario: FormGroup;
  public subscription$: Subscription;
  public setsError$ = new Subject<boolean>();
  public sets$: Observable<SetDTO[]>;
  private localSets: SetDTO[] = [];
  private setsFullLenght: number = 0;
  private page: number = 1;
  private pageSize: number = 24;

  constructor(private cacheService: CacheService,
    private formsBuider: FormBuilder,
    private pageService: PageService,
    private setService: SetService) { }

  ngOnInit() {
    this.sets$ = this.loadSets();
    this.formulario = this.createForm();
    this.subscription$ = this.handleSearch();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public scrollToTop() {
    this.content.scrollToTop(300);
  }

  public doRefresh(event) {
    this.sets$ = this.setService.findAll().pipe(
      map(sets => sets.slice(0, this.pageSize)),
      tap(sets => {
        this.localSets = sets;
        this.page = 1;
        this.setsFullLenght = this.cacheService.setsApiFullLength;
        event.target.complete();
      }),
      catchError(error => {
        this.setsError$.next(true);
        return empty();
      })
    );
  }

  public logScrolling(event: CustomEvent) {
    if (event.detail.scrollTop > 250) {
      this.topButtonEnable = true;
    } else {
      this.topButtonEnable = false;
    }
  }

  public loadData(event) {
    this.page++;

    this.sets$ = of(this.localSets).pipe(
      map(sets => {
        let setsPaginado = this.pageService.paginate(this.cacheService.setsApi, this.pageSize, this.page);
        return sets.concat(setsPaginado);
      }),
      tap(sets => {
        this.localSets = sets;
        event.target.complete();
        if (sets.length >= this.setsFullLenght) { event.target.disabled = true; }
      })
    );
  }

  private createForm() {
    return this.formsBuider.group({
      search: [null]
    });
  }

  private loadSets() {
    let setsCache = this.cacheService.setsApi;
    const findAllSets = () => this.setService.findAll().pipe(
      map(sets => sets.slice(0, this.pageSize)),
      tap(sets => {
        this.localSets = sets;
        this.setsFullLenght = this.cacheService.setsApiFullLength
        this.pageService.presentToast(`${this.setsFullLenght} sets found.`);
      }),
      catchError(error => {
        this.setsError$.next(true);
        return empty();
      })
    );

    return setsCache.length < 1 ? findAllSets() : of(setsCache).pipe(
      map(sets => sets.slice(0, this.pageSize)),
      tap(sets => {
        this.localSets = sets;
        this.setsFullLenght = this.cacheService.setsApiFullLength;
        this.pageService.presentToast(`${this.setsFullLenght} sets found.`);
      }),
    );
  }

  private handleSearch() {
    return this.formulario.valueChanges.pipe(
      map(value => value.search.trim()),
      filter(value => value.length > 2 || value.length === 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.searchSets(value))
    ).subscribe(success => this.sets$ = of(success));
  }

  private searchSets(value: string) {
    let sets = this.cacheService.setsApi;
    let result: SetDTO[] = [];

    if (sets) {
      if (value.length > 0) {
        result = sets.filter(x => x.name.toLowerCase().search(value.toLowerCase()) > -1);
      } else {
        result = this.pageService.paginate(sets, 24, this.page);
      }
    }

    return of(result);
  }
}
