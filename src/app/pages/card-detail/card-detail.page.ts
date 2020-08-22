import { ActivatedRoute } from '@angular/router';
import { CardDTO } from './../../shared/models/card.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

  private card: CardDTO;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.card = this.route.snapshot.data['card'];
    console.log(this.card);
  }

}
