import { UtilService } from './../../services/util.service';
import { CardDTO } from './../../models/card.dto';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { CollectionDTO } from './../../models/collection.dto';

@Component({
  selector: 'app-itens-list',
  templateUrl: './itens-list.component.html',
  styleUrls: ['./itens-list.component.scss'],
})
export class ItensListComponent implements OnInit {

  @Input() itensList$: Observable<CollectionDTO[]>;
  @Input() itensError$ = new Subject<boolean>();

  constructor(private utilService: UtilService) { }

  ngOnInit() { }

  public makeBorderStyle(card: CardDTO) {
    return this.utilService.cardBorderStyle(card);
  }

  public makeManaCost(manaCost: string) {
    return this.utilService.makeManaCost(manaCost);
  }

  public goToCardDetail(card: CardDTO, index: number) {
    console.log("card detail")
  }
}
