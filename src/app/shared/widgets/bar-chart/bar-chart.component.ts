import {Component, Input, OnInit} from '@angular/core';
import {multi} from "./data";
export  interface series {
    name: string;
    series: seriesItem [];
}
export interface seriesItem {
    name: string;
    value: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  view: any[] = [0, 160];
  @Input() data: [];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Course';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Normalized Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  multi = multi;



  constructor() {
    // Object.assign(this,{multi})
    Object.assign(this,this.data)
    console.log(  " this chart data : " + this.data);
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {


  }
}

