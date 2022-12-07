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

  // initialize form dropdown values
  public selectedEntity = MODES.COMPANY;
  public selectedCategoryFilter = 'ALL';

  // an Array of chartData objects used to populate the charts
  public chartData: any[] = [];

  constructor(private investmentDataService: InvestmentDataService) {}

  /**
   * @description Get the initial default data which is by company and set up form controls
   */
  ngOnInit() {
    // get the data for the investment category dropdown
    this.investmentCategories = this.investmentDataService.investmentCategories;
    this.investmentCategories.push('ALL');
 
    this.populateChartData();

  }


  private populateChartData(){
    this.investmentDataService.getDefaultCompanyChartData().subscribe((res: any[]) => {
      this.chartData = res;
    });

  }

  // dropdown change handler for main entity COMPANY or INDUSTRY
  public handleEntityChange(entity) {

    if(entity === MODES.COMPANY){
      
    }
    
  }

  // dropdown change handler for investment category filter dropdown
  public handleCatFilterChange(category) {
  }

  public getChartOptions(i: number) {
    return this.chartData[i];
  }

}
