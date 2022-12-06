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
      //text: 'Angular Column Chart in Material UI Tabs',
    },
    axisY:{
      gridThickness: 0,
      lineThickness: 0,
      tickThickness: 0,
      labelFontSize: 0,
      tickLength: 0,
      margin: -80
    },
    axisX:{},
    data: [
      {
        indexLabel: "{y}",
        indexLabelPlacement: "outside",  
        indexLabelOrientation: "horizontal",
        type: 'column',
        dataPoints: [
          { label: 'apple', color:'#0085ff', y: 1000000000 },
          { label: 'orange', color:'#0085ff', y: 2000000000 },
          { label: 'banana', color:'#0085ff', y: 3000000000 },
          { label: 'mango', color: '#0085ff', y: 4000000000 },
          { label: 'grape', color: '#0085ff', y: 5000000000 },
        ],
      },
    ],
  };




  public sayHello() {
    alert('yo');
    console.log('what up');
  }
}
