import { CardItemDTO } from './../../../shared/models/card-item.dto';
import { CollectionDTO } from './../../../shared/models/collection.dto';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-container',
  templateUrl: './collection-container.component.html',
  styleUrls: ['./collection-container.component.scss'],
})
export class CollectionContainerComponent implements OnInit {

  @Input() collections$: Observable<CollectionDTO[]>;
  @Input() wantList$: Observable<CardItemDTO[]>;
  public segmentAtivo: string = 'sets';

  constructor() { }

  ngOnInit() {}

  public onSegmentChanged(event){
    this.segmentAtivo = event.detail.value;
  }
}
