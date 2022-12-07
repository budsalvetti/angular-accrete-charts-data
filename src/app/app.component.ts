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
  public chartData: any[] = [];

  constructor(private investmentDataService: InvestmentDataService) {}

  columnChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    height: 150,
    axisX2: { lineThickness: 0, tickThickness: 0 },
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
        dataPoints: [],
      },
    ],
  };

  ngOnInit() {
    this.investmentDataService
      .getDefaultCompanyData()
      .subscribe((chartData: any[]) => {
        for (let company of chartData) {
          //copy the default chart options
          let newChartOptions = { ...this.columnChartOptions };

          newChartOptions.data[0].dataPoints = [];

          for (let year of company['years']) {
            newChartOptions.data[0].dataPoints.push({
              label: year.year as string,
              color: '#0085ff',
              y: year['total'],
            });
          }

          this.chartData.push(newChartOptions);
        }
      });
  }

  public getChartOptions(i: number) {
    return this.chartData[i];
  }

  public switchTabs(event) {
    alert('yo');
    console.log('what up');
    console.log(event);
  }
}
