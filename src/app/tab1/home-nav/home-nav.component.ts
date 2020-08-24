import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { SetDTO } from 'src/app/shared/models/set.dto';
import { UtilService } from './../../shared/services/util.service';
import { CacheService } from './../../shared/services/cache.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss'],
})
export class HomeNavComponent implements OnInit {

  @Input() setsTop10$: Observable<SetDTO[]>;
  @Input() setsError$ = new Subject<boolean>();

  constructor(private utilService: UtilService,
    private cacheService: CacheService,
    private router: Router) { }

  ngOnInit() { }

  public setIconClass(set: SetDTO) {
    return this.utilService.setIconClass(set.code);
  }

  public goToSetDetail(set: SetDTO) {
    this.cacheService.selectedSet = set;
    this.router.navigate([`./sets/${set.code}/cards`]);
  }
}
