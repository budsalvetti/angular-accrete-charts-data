import { Injectable } from '@angular/core';
import { Observable, of, pipe, map } from 'rxjs';

@Injectable()
export class InvestmentDataService {

  // BEGIN MOCK DATA SETUP variables
  public readonly years = [
    2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];

  public readonly industries = ['Software', 'Space and foreign technology'];
  public readonly companies = ['ArgusSoft', 'Andromedan Light'];
  public readonly investmentCategories = [
    'CAPEX',
    'Revenue',
    'Aquisitions',
    'R&D',
    'Divestures'
  ];

  // this is mock data that is used as a starting point for investment categories which will be incremted to
  // simulate change as we create the mock data
  public readonly mockCategorySeedAmounts = {'CAPEX': 15000000,
                                            'Revenue': 100000,
                                            'Aquisitions': 20000000,
                                            'R&D': 30000000,
                                            'Divestures': 400000};

// END MOCK DATA SETUP variables


  // basic chart visual configuration that can be cloned
  public readonly defaultChartOptions = {
    animationEnabled: true,
    theme: 'dark1',
    height: 150,
    // put the x-axis on top by using axisX2
    axisX2: { lineThickness: 0, tickThickness: 0, labelFontSize: 12, labelFontColor: 'white'},
    axisY: {
      // hide the y x-axis completely
      gridThickness: 0,
      lineThickness: 0,
      tickThickness: 0,
      labelFontSize: 0,
      tickLength: 0
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

  constructor() {}


  /**
   * getCompanyData
   *
   * @description acts similar to http_client behavior as it returns an observable with an Array
   * as http_client also parses returned JSON into javascript objects so this is a decent mock
   * @returns Observable<object>
   */
  public getCompanyData(investmentCategory:string): Observable<any[]> {
    const rtnVal = [];

    let yearTotal = this.mockCategorySeedAmounts[investmentCategory];;

    for (let company of this.companies) {
      // add name and total to company object
      const companyObj = { name: company };

      // init years data for company
      companyObj['years'] = [];

      for (let year of this.years) {
        //initialize a new year Object
        const yearObj = { year };
        yearObj['total'] = yearTotal;
        // add a million each year
        yearTotal += 100000;
        companyObj['years'].push(yearObj);
      }

      rtnVal.push(companyObj);
    }

    return of(rtnVal);
  }

  /**
   * getIndustryData
   * @returns Observable<object>
   * @description creates mock industry data set similar to
   * what may be retrieved from a remote service call
   */
  public getIndustryData(investmentCategory:string): Observable<any[]> {
    const rtnVal = [];

    for (let industry of this.industries) {
      const industryObj = { name: industry };

      industryObj['years'] = [];

      let yearTotal = this.mockCategorySeedAmounts[investmentCategory];

      for (let year of this.years) {
        const yearObj = { year };

        yearObj['total'] = yearTotal;
        yearObj['score'] = yearTotal;

        industryObj['years'].push(yearObj);

        yearTotal += 100000;
      }

      rtnVal.push(industryObj);
    }

    return of(rtnVal);
  }

  /**
   * getCompanyChartData
   * @returns Observable<any[]>
   * @description creates an array of chart data suitable to plugin in to canvasJS chart
   * by adapting the raw company data as such
   */
  public getCompanyChartData(investmentCategory:string): Observable<any[]> {
    return this.getCompanyData(investmentCategory).pipe(
      map((chartData: any[]) => {
        const adaptedChartData = [];

        for (let i = 0; i < chartData.length; i++) {
          const company = chartData[i];

          //shallow copy the default chart options
          let newChartOptions = {
            ...this.defaultChartOptions,
          };

          if (i > 0) {
            newChartOptions.axisX2 = {
              lineThickness: 0,
              tickThickness: 0,
              labelFontSize: 12,
              labelFontColor: 'transparent' 
            };
          }

          newChartOptions['entityName'] = company.name;

          newChartOptions.data[0].dataPoints = [];

          for (let year of company['years']) {
            newChartOptions.data[0].dataPoints.push({
              label: year.year as string,
              color: '#0085ff',
              y: year['total'],
            });
          }

          adaptedChartData.push(newChartOptions);
        }

        return adaptedChartData;
      })
    );
  }

  /**
   * getIndustryChartData
   * @returns Observable<any[]>
   * @description creates an array of chart data suitable to plugin in to canvasJS chart
   * by adapting the raw industry data as such
   */
  public getIndustryChartData(investmentCategory: string): Observable<any[]> {
    return this.getIndustryData(investmentCategory).pipe(
      map((chartData: any[]) => {
        const adaptedChartData = [];

        for (let i = 0; i < chartData.length; i++) {
          const industryObj = chartData[i];

          //shallow copy the default chart options
          let newChartOptions = {
            ...this.defaultChartOptions,
          };

          // hide x axis for all charts but the first
          if (i > 0) {
            newChartOptions.axisX2 = {
              lineThickness: 0,
              tickThickness: 0,
              labelFontSize: 12,
              labelFontColor: 'transparent' 
            };
          }

          newChartOptions['entityName'] = industryObj.name;

          newChartOptions.data[0].dataPoints = [];

          for (let year of industryObj['years']) {
            newChartOptions.data[0].dataPoints.push({
              label: year.year as string,
              color: '#0085ff',
              y: year['total'],
            });
          }

          adaptedChartData.push(newChartOptions);
        }

        return adaptedChartData;
      })
    );
  }

  /**
   * getChartData
   * @description main entry point for all data requests from UI
   * @returns Observable<any[]>
   */
  public getChartData(entity:string, investmentCategory): Observable<any[]> {
    if(entity === 'COMPANY'){
      return this.getCompanyChartData(investmentCategory);
    } else if (entity === 'INDUSTRY') {
      return this.getIndustryChartData(investmentCategory);
    }
  }

}
