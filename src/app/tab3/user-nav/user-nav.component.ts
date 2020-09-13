import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PopoverUserComponent } from './../popover-user/popover-user.component';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss'],
})
export class UserNavComponent implements OnInit {

  public picture: string;

  constructor(public popoverController: PopoverController,
    private camera: Camera) { }

  ngOnInit() { }

  public async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverUserComponent,
      componentProps: { picture: this.picture },
      cssClass: 'my-popover-class',
      event: ev,
      translucent: true
    });
    
    return await popover.present();
  }

  public getCameraPicture(event: any) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.presentPopover(event);
    }, (err) => {
      console.log("Error is", err)
    });
  }
}
