import { BaseDTO } from './base.dto';

export interface CardRefDTO extends BaseDTO {
    
    cardId: string;
    collection: boolean;
    favorites: boolean;
    wantList: boolean;
    decksIds: string;
}