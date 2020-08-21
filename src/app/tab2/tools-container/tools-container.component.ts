import { Component, OnInit } from '@angular/core';

const TOOLS = [
  { name: "Life Count", msg: "Counter for hit points.", img: "../../../assets/backgrounds/background-life-count.jpg" },
  { name: "Mana Count", msg: "Counter for mana base.", img: "../../../assets/backgrounds/background-mana-count.jpg" },
  { name: "Time", msg: "Starting time counter.", img: "../../../assets/backgrounds/background-time.jpg" },
  { name: "Dice", msg: "Dice of 2, 3, 4, 6, 8, 12 and 20 faces.", img: "../../../assets/backgrounds/background-dices.png" },
  { name: "Coin", msg: "Double-sided coin (heads, tails).", img: "../../../assets/backgrounds/background-coin.png" }
]

@Component({
  selector: 'app-tools-container',
  templateUrl: './tools-container.component.html',
  styleUrls: ['./tools-container.component.scss'],
})
export class ToolsContainerComponent implements OnInit {

  public tools: any[];

  constructor() { }

  ngOnInit() {
    this.tools = TOOLS;
  }
}
