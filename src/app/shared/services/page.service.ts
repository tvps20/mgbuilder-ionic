import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    constructor(public toastController: ToastController) { }

    public paginate(array: any[], page_size, page_index): any[] {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_index - 1) * page_size, page_index * page_size);
    }

    public async presentToast(msg: string, color: string = 'dark') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 1000,
            color: color,
            cssClass: 'custom-toast'
        });
        toast.present();
    }
}