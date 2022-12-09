import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() title: string;
  @Input() src: string;
  @Input() href: string;
  @Input() alt: string;

  constructor() { }

  ngOnInit(): void {
  }

  logMessage(){
    console.log(this.href);
  }

}
