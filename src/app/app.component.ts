import { Component, OnInit } from '@angular/core';
import { InvestmentDataService } from './services/investment-data.service';

enum MODES {
  COMPANY = 'COMPANY',
  INDUSTRY = 'INDUSTRY',
  INDUSTRY_SCORE = 'INDUSTRY_SCORE'
}

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  private readonly defaultMode = MODES.COMPANY;

  // make the MODES iterable so we can use in dropdown options
  public modes = Object.keys(MODES);
  public modesEnum = MODES;

  public investmentCategories: any[];

  // initialize form dropdown values
  public selectedEntity = MODES.COMPANY;
  public selectedCategoryFilter = 'CAPEX';

  // an Array of chartData objects used to populate the charts
  public chartData: any[] = [];

  constructor(private investmentDataService: InvestmentDataService) {}

  /**
   * @description Get the initial default data which is by company and set up form controls
   */
  ngOnInit() {
    // get the data for the investment category dropdown
    this.investmentCategories = this.investmentDataService.investmentCategories;
    this.populateChartData(this.selectedEntity, this.selectedCategoryFilter);
  }

  private populateChartData(entity: string, category: string) {
      this.investmentDataService
        .getChartData(entity,category).subscribe((res: any[]) => {
          this.chartData = res;
        });
  }

  // dropdown change handler for main entity COMPANY or INDUSTRY
  public handleEntityChange(entity) {
    this.populateChartData(entity, this.selectedCategoryFilter);
  }

  // dropdown change handler for investment category filter dropdown
  public handleCatFilterChange(category) {
    this.populateChartData(this.selectedEntity, category)
  }


}
