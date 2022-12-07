import { Injectable } from '@angular/core';
import { Observable, of, pipe, map } from 'rxjs';

@Injectable()
export class InvestmentDataService {
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
    'Divestures',
  ];


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

    let yearTotal = 100000000;

    for (let company of this.companies) {
      // add name and total to company object
      const companyObj = { name: company };

      yearTotal = 100000000;

      // init years data for company
      companyObj['years'] = [];

      for (let year of this.years) {
        //initialize a new year Object
        const yearObj = { year };
        yearObj['total'] = yearTotal;
        // add a million each year
        yearTotal += 100000000;
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

      let yearTotal = 100000000;

      for (let year of this.years) {
        const yearObj = { year };

        yearObj['total'] = yearTotal;
        yearObj['score'] = yearTotal;

        industryObj['years'].push(yearObj);

        yearTotal += 100000000;
      }

      rtnVal.push(industryObj);
    }

    return of(rtnVal);
  }

  /**
   * @description converts raw companies datasets in chart data suitable for initializing an array of charts
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
