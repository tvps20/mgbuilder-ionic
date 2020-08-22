import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { CardDTO } from './../../models/card.dto';
import { DeckDTO } from './../../models/deck.dto';
import { DeckService } from './../../services/domain/deck.service';

@Component({
  selector: 'app-popover-card',
  templateUrl: './popover-card.component.html',
  styleUrls: ['./popover-card.component.scss'],
})
export class PopoverCardComponent implements OnInit {

  @Input() card: CardDTO;
  public formulario: FormGroup;
  public decks$: Observable<DeckDTO[]>;
  public select$: Observable<string[]>;

  constructor(private formsBuider: FormBuilder,
    private deckService: DeckService) { }

  ngOnInit() {
    this.formulario = this.createForm();
    this.decks$ = this.deckService.findAll();
  }

  private createForm() {
    return this.formsBuider.group({
      add: [null]
    });
  }
}
