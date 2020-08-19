import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    public setIconClass(setCode: string) {
        let code = setCode.toLowerCase();
        return `ss ss-${code} ss-uncommon ss-2x`;
    }
}