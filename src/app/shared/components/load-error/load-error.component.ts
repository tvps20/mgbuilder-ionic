import { Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load-error',
  templateUrl: './load-error.component.html',
  styleUrls: ['./load-error.component.scss'],
})
export class LoadErrorComponent implements OnInit {

  @Input() error$ = new Subject<boolean>();
  @Input() msgError = "Error loading data!!!";
  @Input() msgLoad = "Loading data...";

  constructor() { }

  ngOnInit() { }

}
