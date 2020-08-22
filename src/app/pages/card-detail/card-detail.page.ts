import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { CardDTO } from './../../shared/models/card.dto';
import { CacheService } from './../../shared/services/cache.service';
import { CollectionDTO } from './../../shared/models/collection.dto';
import { PopoverCardComponent } from './popover-card/popover-card.component';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

  public collection: CollectionDTO;
  public toolbarTitle: string;
  public cardIndex: number = 0;
  private cardSelected: CardDTO;

  constructor(private cacheService: CacheService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.collection = this.cacheService.selectedCollection;
    this.cardSelected = this.cacheService.selectedCardDetail;
    this.cardIndex = this.cacheService.selectedCardIndex;
    this.toolbarTitle = this.cacheService.selectedCardDetail?.setName || 'No collection';
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverCardComponent,
      componentProps: { card: this.cardSelected },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  changeCard(card){
    this.cardSelected = card;
  }
}
