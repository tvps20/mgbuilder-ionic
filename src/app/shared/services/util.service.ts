import { Injectable } from '@angular/core';

import { CardDTO } from './../models/card.dto';
import { ColorType } from './../util/enuns-type.enum';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    public setIconClass(setCode: string) {
        let code = setCode.toLowerCase();
        return `ss ss-${code} ss-uncommon ss-2x`;
    }

    public makeManaCost(manaCost: string) {
        let manas: string[] = [];
        if (manaCost) {
            manaCost.split('{').forEach(x => {
                if (x !== '') {
                    manas.push(x.substring(0, 1).toLowerCase());
                }
            })
        }

        return manas;
    }

    public cardBorderStyle(card: CardDTO = null) {
        let color = this.choseColor(ColorType.INCOLOR);

        if (card) {
            if (card.colors.length === 1) {
                color = this.choseColor(card.colors[0]);
            } else {
                if (card.colors.length > 1) {
                    color = this.choseColor(ColorType.MULTICOLOR);
                } else {
                    if (card.types[0] === 'Land') {
                        color = this.choseColor(card.subtypes[0]);
                    }
                }
            }
        }

        return `border-left: 10px solid ${color};`;
    }

    private choseColor(color: string) {
        switch (color) {
            case (ColorType.BLACK): {
                return '#212121';
            }
            case ('Swamp'): {
                return '#212121';
            }
            case (ColorType.WHITE): {
                return '#FFF59D';
            }
            case ('Plains'): {
                return '#FFF59D';
            }
            case (ColorType.RED): {
                return '#ef5350';
            }
            case ('Mountain'): {
                return '#ef5350';
            }
            case (ColorType.GREEN): {
                return '#66BB6A';
            }
            case ('Forest'): {
                return '#66BB6A';
            }
            case (ColorType.BLUE): {
                return '#42A5F5';
            }
            case ('Island'): {
                return '#42A5F5';
            }
            case ColorType.MULTICOLOR: {
                return '#FFC107';
            }
            default: {
                return '#78909C';
            }
        }
    }
}