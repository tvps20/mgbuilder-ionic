import { Observable, of, Subject } from 'rxjs';
import { CardDTO } from './../../shared/models/card.dto';
import { CacheService } from './../../shared/services/cache.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit {

  private cards: CardDTO[] = [];
  public cards$: Observable<CardDTO[]>;
  public setTitle: string = "Set Detail"

  constructor(private cacheService: CacheService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.cards = this.route.snapshot.data['cards'];
    this.getTitle();
    this.cards$ = of(this.cards);
  }

  private getTitle() {
    if (this.cacheService.selectedSet) {
      this.setTitle = this.cacheService.selectedSet.name;
    } 
  }
}
