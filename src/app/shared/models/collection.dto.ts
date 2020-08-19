import { BaseDTO } from './base.dto';
import { CardDTO } from './card.dto';
import { CardItemDTO } from './card-item.dto';
import { SetDTO } from './set.dto';

export interface CollectionDTO extends BaseDTO {

    set: SetDTO;
    cards: CardDTO[]
    cardsItens?: CardItemDTO[];
    qtdTotalCards: number;
}