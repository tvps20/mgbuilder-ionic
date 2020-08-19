import { BaseDTO } from './base.dto';
import { CardDTO } from './card.dto';

export interface CardItemDTO extends BaseDTO {
    
    card: CardDTO;
    qtd: number;
}