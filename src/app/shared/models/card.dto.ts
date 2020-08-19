import { RulingDTO } from './ruling.dto';
import { ForeignNameDTO } from './foreign-name.dto';
import { LegalityDTO } from './legality.dto';

export interface CardDTO {
    
    name: string;
    names: string[];
    manaCost: string;
    cmc: number;
    colors: string[];
    colorIdentity: string[];
    type: string;
    supertypes: string[];
    types: string[];
    subtypes: string[];
    rarity: string;
    set: string;
    setName: string;
    text: string;
    artist: string;
    number: string;
    power: string;
    toughness: string;
    layout: string;
    variations: string[];
    multiverseid: number;
    imageUrl: string;
    rulings: RulingDTO[];
    foreignNames: ForeignNameDTO[];
    printings: string[];
    originalText: string;
    originalType: string;
    flavor: string;
    legalities: LegalityDTO[];
    loyalty: string;
    id: string;
}