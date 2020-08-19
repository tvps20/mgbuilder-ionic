import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.scss'],
})
export class AlertInfoComponent implements OnInit {

  @Input() msgInfo = "No itens found.";

  constructor() { }

  ngOnInit() {}
}
