import { CacheService } from './../../shared/services/cache.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.page.html',
  styleUrls: ['./set-detail.page.scss'],
})
export class SetDetailPage implements OnInit {

  public setTitle: string = "Set Detail"

  constructor(private cacheService: CacheService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTitle();
  }

  private getTitle() {
    if (this.cacheService.selectedSet) {
      this.setTitle = this.cacheService.selectedSet.name;
    } else {
      this.setTitle = this.route.params['code']
    }
  }
}
