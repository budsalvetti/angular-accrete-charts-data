import { Component, OnInit } from '@angular/core';
import { InvestmentDataService } from './services/investment-data.service';

enum MODES {
  COMPANY,
  INDUSTRY,
}

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private readonly defaultMode = MODES.COMPANY;
  private chartData: any[];

  constructor(private investmentDataService: InvestmentDataService) {}

  columnChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    height: 150,
    title: {
      //text: 'Angular Column Chart in Material UI Tabs',
    },
    axisY: {
      gridThickness: 0,
      lineThickness: 0,
      tickThickness: 0,
      labelFontSize: 0,
      tickLength: 0,
      margin: -88,
    },
    data: [
      {
        indexLabel: '{y}',
        indexLabelPlacement: 'outside',
        indexLabelOrientation: 'horizontal',
        axisXType: 'secondary',
        type: 'column',
        dataPoints: [
          { label: '2014', color: '#0085ff', y: 1000000000 },
          { label: '2015', color: '#0085ff', y: 2000000000 },
          { label: '2016', color: '#0085ff', y: 3000000000 },
          { label: '2017', color: '#0085ff', y: 4000000000 },
          { label: '2018', color: '#0085ff', y: 5000000000 },
          { label: '2019', color: '#0085ff', y: 6000000000 },
          { label: '2020', color: '#0085ff', y: 7000000000 },
          { label: '2021', color: '#0085ff', y: 8000000000 },
          { label: '2022', color: '#0085ff', y: 9000000000 },
          { label: '2022', color: '#0085ff', y: 10000000000 },
        ],
      },
    ],
  };

  ngOnInit() {
    this.investmentDataService
      .getDefaultCompanyData()
      .subscribe((chartData: object) => {
        console.log(chartData);
      });
  }

  public switchTabs(event) {
    alert('yo');
    console.log('what up');
    console.log(event);
  }
}
