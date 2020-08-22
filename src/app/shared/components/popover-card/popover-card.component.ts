import { FavoriteListService } from './../../services/favorite-list.service';
import { FavoriteCardsPage } from './../../../pages/favorite-cards/favorite-cards.page';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { CardDTO } from './../../models/card.dto';
import { DeckDTO } from './../../models/deck.dto';
import { DeckService } from './../../services/domain/deck.service';
import { CardRefService } from './../../services/domain/card-ref.service';

@Component({
  selector: 'app-popover-card',
  templateUrl: './popover-card.component.html',
  styleUrls: ['./popover-card.component.scss'],
})
export class PopoverCardComponent implements OnInit, OnDestroy {

  @Input() card: CardDTO;
  public formulario: FormGroup;
  public decks$: Observable<DeckDTO[]>;
  public select$: Observable<string[]>;
  private subscriptions$: Subscription[] = [];

  constructor(private formsBuider: FormBuilder,
    private cardRefService: CardRefService,
    private favoriteService: FavoriteListService,
    private deckService: DeckService) { }

  ngOnInit() {
    this.formulario = this.createForm();
    this.decks$ = this.deckService.findAll();
    this.subscriptions$.push(this.selectChange());
    this.select$ = this.cardRefService.getSelectCardRef(this.card.id);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
  }

  private createForm() {
    return this.formsBuider.group({
      add: [null]
    });
  }

  private selectChange() {
    return this.formulario.get('add').valueChanges.subscribe( success => {
      let cardRef = this.cardRefService.parseToEntity(this.formulario, this.card);
      this.subscriptions$.push(this.cardRefService.saveOrUpdate(cardRef).subscribe());
      this.subscriptions$.push(this.favoriteService.saveOrRemove(this.card, cardRef.favorite).subscribe());
    });
  }
}
