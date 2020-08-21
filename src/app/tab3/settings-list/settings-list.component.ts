import { Component, OnInit } from '@angular/core';

const USER_SECTION_ONE = [
  { name: "Favorite cards", icon: "star-outline", path: '/tabs/tab3' },
  { name: "Rules", icon: "help-circle-outline", path: '/tabs/tab3' },
  { name: "Change Password", icon: "key-outline", path: '/tabs/tab3' },
  { name: "Edit profile", icon: "pencil-outline", path: '/tabs/tab3' }
]

const USER_SECTION_TWO = [
  { name: "Settings", icon: "settings-outline" },
  { name: "Data and backup", icon: "server-outline" },
  { name: "Feedback", icon: "mail-outline" },
  { name: "About", icon: "warning-outline" },
]

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss'],
})
export class SettingsListComponent implements OnInit {

  public userSectionOne: any[];
  public userSectionTwo: any[];

  constructor() { }

  ngOnInit() {
    this.userSectionOne = USER_SECTION_ONE;
    this.userSectionTwo = USER_SECTION_TWO;
  }
}
