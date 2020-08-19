import { BaseDTO } from './base.dto';

export interface DeckDTO extends BaseDTO {

    name: string;
    format: string;
    colors: string[];
    favorite: boolean;
}