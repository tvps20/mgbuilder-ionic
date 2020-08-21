import { map, switchMap } from 'rxjs/operators';
import { ToastController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    constructor(public toastController: ToastController,
        public loadingController: LoadingController) { }

    public paginate(array: any[], page_size, page_index): any[] {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_index - 1) * page_size, page_index * page_size);
    }

    public async presentToast(msg: string, color: string = 'dark', icon = 'information-circle-outline') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: color,
            cssClass: 'custom-toast',
            buttons: [{ icon: icon }]
        });
        toast.present();
    }

    public presentLoading(msg = "Please wait...") {
        return from(this.loadingController.create({
            message: msg,
        })).pipe(switchMap((loading) =>
            from(loading.present())
                .pipe(map(() => loading))
        ));
    }
}