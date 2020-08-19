import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { SetDTO } from '../../../shared/models/set.dto';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'app-sets-list',
  templateUrl: './sets-list.component.html',
  styleUrls: ['./sets-list.component.scss'],
})
export class SetsListComponent implements OnInit {

  @Input() sets$: Observable<SetDTO[]>;
  @Input() setsError$ = new Subject<boolean>();

  constructor(private utilService: UtilService) { }

  ngOnInit() { }

  styleBorderSet(set: SetDTO) {
    return this.utilService.cardBorderStyle();
  }

  goToSetDetail(set: SetDTO) {
    console.log('go to detail')
  }

  setIconClass(set: SetDTO) {
    return this.utilService.setIconClass(set.code);
  }
}
