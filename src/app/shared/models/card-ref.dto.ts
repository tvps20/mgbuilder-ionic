import { BaseDTO } from './base.dto';

export interface CardRefDTO extends BaseDTO {
    
    cardId: string;
    collection: boolean;
    favorite: boolean;
    wantList: boolean;
    decksIds: string;
}