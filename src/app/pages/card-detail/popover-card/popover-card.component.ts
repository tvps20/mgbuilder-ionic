import { CollectionListService } from './../../../shared/services/collection-list.service';
import { WantListService } from './../../../shared/services/want-list.service';
import { FavoriteListService } from '../../../shared/services/favorite-list.service';
import { FavoriteCardsPage } from '../../favorite-cards/favorite-cards.page';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { CardDTO } from '../../../shared/models/card.dto';
import { DeckDTO } from '../../../shared/models/deck.dto';
import { DeckService } from '../../../shared/services/domain/deck.service';
import { CardRefService } from '../../../shared/services/domain/card-ref.service';

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
    private deckService: DeckService,
    private wantListService: WantListService,
    private collectionService: CollectionListService) { }

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
      this.subscriptions$.push(this.wantListService.saveOrRemove({card: this.card, qtd: 1}, cardRef.wantList).subscribe());
      this.subscriptions$.push(this.collectionService.saveOrRemove(this.card, cardRef.collection).subscribe());
    });
  }
}
