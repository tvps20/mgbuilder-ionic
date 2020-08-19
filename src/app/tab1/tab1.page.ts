import { Subject, empty, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { SetDTO } from './../shared/models/set.dto';
import { SetService } from './../shared/services/domain/set.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public setsTop10$: Observable<SetDTO[]>;
  public setsError$ = new Subject<boolean>();

  constructor(private setService: SetService) {}

  ngOnInit(): void {
    this.setsTop10$ = this.loadSets();
  }

  private loadSets(){
    return this.setService.findTop10().pipe(
      catchError(error => {
        this.setsError$.next(true);
        return empty();
      })
    );
  }
}
