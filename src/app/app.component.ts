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

  public investmentCategories: any[];

  // an Array of chartData objects used to populate the charts
  public chartData: any[] = [];

  constructor(private investmentDataService: InvestmentDataService) {}

  /**
   * @description Get the initial default data which is by company and set up form controls
   */
  ngOnInit() {
    // get the data for the investment category dropdown
    this.investmentCategories = this.investmentDataService.investmentCategories;

    this.investmentDataService
      .getDefaultCompanyData()
      .subscribe((chartData: any[]) => {
        for (let i = 0; i < chartData.length; i++) {
          const company = chartData[i];

          //shallow copy the default chart options
          let newChartOptions = {
            ...this.investmentDataService.defaultChartOptions,
          };

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

  // dropdown change handler for main entity COMPANY or INDUSTRY
  public handleEntityChange(evt) {
    alert('what is the evt ' + JSON.stringify(evt));
  }

  // dropdown change handler for investment category filter dropdown
  public handleCatFilterChange(evt) {
    alert('what is the evt ' + JSON.stringify(evt));
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
