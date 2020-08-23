import { CardDTO } from './../../../shared/models/card.dto';
import { SetDTO } from './../../../shared/models/set.dto';
import { UtilService } from './../../../shared/services/util.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { CollectionDTO } from './../../../shared/models/collection.dto';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnInit {

  @Input() collectionsList$: Observable<CollectionDTO[]>;
  @Input() collectionError$ = new Subject<boolean>();

  constructor(private utilService: UtilService) { }

  ngOnInit() {}

  public setIconClass(set: SetDTO) {
    return this.utilService.setIconClass(set.code);
  }

  public makeBorderStyle() {
    return this.utilService.cardBorderStyle();
  }

  public goToSetDetail(collection: CollectionDTO){
    console.log("set detalhes")
  }
}
