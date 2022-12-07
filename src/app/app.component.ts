import { Component, OnInit } from '@angular/core';
import { InvestmentDataService } from './services/investment-data.service';

enum MODES {
  COMPANY = 'COMPANY',
  INDUSTRY = 'INDUSTRY',
}

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private readonly defaultMode = MODES.COMPANY;

  // make the MODES iterable so we can use in dropdown options
  public modes = Object.keys(MODES);

  // an Array of chartData objects used to populate the charts
  public chartData: any[] = [];

  constructor(private investmentDataService: InvestmentDataService) {}

  // these default chart options are shallow copied each time they are used
  // see ngOnInit()
  defaultChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    height: 150,
    // put the x-axis on top by using axisX2
    axisX2: { lineThickness: 0, tickThickness: 0, labelFontSize: 14 },
    axisY: {
      // hide the y x-axis completely
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
        // axisXType as secondary means to use the axisX2 above
        axisXType: 'secondary',
        type: 'column',
        dataPoints: [],
      },
    ],
  };

  /**
   * @description Get the initial default data which is by company
   */
  ngOnInit() {
    this.investmentDataService
      .getDefaultCompanyData()
      .subscribe((chartData: any[]) => {
        for (let i = 0; i < chartData.length; i++) {
          const company = chartData[i];

          //shallow copy the default chart options
          let newChartOptions = { ...this.defaultChartOptions };

          if (i > 0) {
            newChartOptions.axisX2 = {
              lineThickness: 0,
              tickThickness: 0,
              labelFontSize: 0,
            };
          }

          newChartOptions['companyName'] = company.name;

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
