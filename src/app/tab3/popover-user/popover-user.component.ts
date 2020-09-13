import { AwsService } from './../../shared/services/aws.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popover-user',
  templateUrl: './popover-user.component.html',
  styleUrls: ['./popover-user.component.scss'],
})
export class PopoverUserComponent implements OnInit {

  @Input() picture: string;
  @Output() onUpdateImg: EventEmitter<string> = new EventEmitter<string>();
  public submitImg: boolean = false;

  constructor(private awsService: AwsService) { }

  ngOnInit() {}

  public sendImg(){
    this.submitImg = true;
    this.awsService.uploadFile(this.picture , "profile-img").then((res:string) => {
      console.log("response", res);
      this.onUpdateImg.emit(res);
    }).catch(error => {
      console.log("Error: ", error);
      this.onUpdateImg.emit("error");
    });
  }
}
