import { PopoverController } from '@ionic/angular';
import { AwsService } from './../../shared/services/aws.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popover-user',
  templateUrl: './popover-user.component.html',
  styleUrls: ['./popover-user.component.scss'],
})
export class PopoverUserComponent implements OnInit {

  @Input() picture: string;
  @Input() profileImgRef: any;
  public submitImg: boolean = false;

  constructor(private awsService: AwsService,
    private popoverController: PopoverController) { }

  ngOnInit() { }

  public sendImg() {
    this.submitImg = true;
    this.awsService.uploadFile(this.picture, "profile-img").then((res: string) => {
      console.log("response", res);
      this.profileImgRef.img = "https://mg-builder-ionic.s3-sa-east-1.amazonaws.com/" + res;
      this.DismissClick();
    }).catch(error => {
      console.log("Error: ", error);
      // this.cacheService.profileImg = "error";
      this.DismissClick();
    });
  }

  private async DismissClick() {
    await this.popoverController.dismiss();
  }
}
