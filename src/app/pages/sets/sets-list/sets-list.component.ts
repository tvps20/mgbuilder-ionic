import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { SetDTO } from '../../../shared/models/set.dto';
import { UtilService } from '../../../shared/services/util.service';
import { CacheService } from './../../../shared/services/cache.service';

@Component({
  selector: 'app-sets-list',
  templateUrl: './sets-list.component.html',
  styleUrls: ['./sets-list.component.scss'],
})
export class SetsListComponent implements OnInit {

  @Input() setsList$: Observable<SetDTO[]>;
  @Input() setsError$ = new Subject<boolean>();

  constructor(private utilService: UtilService,
    private cacheService: CacheService,
    private router: Router) { }

  ngOnInit() { }

  styleBorderSet(set: SetDTO) {
    return this.utilService.cardBorderStyle();
  }

  goToSetDetail(set: SetDTO) {
    this.cacheService.selectedSet = set;
    this.router.navigate([`./sets/${set.code}/cards`]);
  }

  setIconClass(set: SetDTO) {
    return this.utilService.setIconClass(set.code);
  }
}
