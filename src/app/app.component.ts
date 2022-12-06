import { Component } from '@angular/core';
import { InvestmentDataService } from './services/investment-data.service';

enum MODES {
  COMPANY,
  INDUSTRY,
}

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private readonly defaultMode = MODES.COMPANY;

  constructor(private investmentDataService: InvestmentDataService) {}

  get chartData(): object[] {
    return [{ someKey: 'val' }];
  }

  columnChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    title: {
      text: 'Angular Column Chart in Material UI Tabs',
    },
    axisY:{
      gridThickness: 0,
      lineThickness: 0,
      tickThickness: 0,
      labelFontSize: 0
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: 'apple', color:'#0085ff', y: 10 },
          { label: 'orange', color:'#0085ff', y: 15 },
          { label: 'banana', color:'#0085ff', y: 25 },
          { label: 'mango', color: '#0085ff', y: 30 },
          { label: 'grape', color: '#0085ff', y: 28 },
        ],
      },
    ],
  };




  public sayHello() {
    alert('yo');
    console.log('what up');
  }
}
