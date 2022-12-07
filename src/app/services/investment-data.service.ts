import { Injectable } from '@angular/core';
import { Observable, of, pipe, map } from 'rxjs';

@Injectable()
export class InvestmentDataService {
  private defaultData: any[];
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


  constructor() {}

  /**
   * getCompanyDataByInvestmentCategory
   *
   * @description acts similar to http_client behavior as it returns an observable with an Array
   * as http_client also parses returned JSON into javascript objects so this is a decent mock
   * @returns Observable<object>
   */
  public getCompanyDataByInvestmentCategory(
    investmentCategory: string
  ): Observable<object> {
    return this.getDefaultCompanyData().pipe(
      map((defaultCompanyData: object[]) => {
        for (let company of defaultCompanyData) {
          for (let year of company['years']) {
            year.total = year.investmentCatMap[investmentCategory].total;
          }
        }
        return defaultCompanyData;
      })
    );
  }

  /**
   * getDefaultData
   *
   * @description acts similar to http_client behavior as it returns an observable with an Array
   * as http_client also parses returned JSON into javascript objects so this is a decent mock
   * @returns Observable<object>
   */
  public getDefaultCompanyData(): Observable<any[]> {
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
   * getDefaultIndustryData
   * @returns Observable<object>
   */
  public getDefaultIndustryData(): Observable<any[]> {
    const rtnVal = [];

    for (let industry of this.industries) {
      const industryObj = { name: industry };

      industryObj['years'] = [];

      let yearTotal = 100000000;

      for (let year of this.years) {
        const yearObj = { year };

        yearObj['total'] = yearTotal;
        yearObj['score'] = yearTotal;

        yearTotal += 1000000000;
      }

      rtnVal.push(industryObj);
    }

    return of(rtnVal);
  }

  /**
   * getIndustryDataByInvestmentCategory
   *
   * @description acts similar to http_client behavior as it returns an observable with an Array
   * as http_client also parses returned JSON into javascript objects so this is a decent mock
   * this should be doing alot more if it was truly gathering all the totals from the proper place
   * but we can pretend for this excercise :)
   * @returns Observable<object>
   */
  public getIndustryDataByInvestmentCategory(
    investmentCategory: string
  ): Observable<any[]> {
    return this.getDefaultIndustryData();
  }


  /**
   * @description converts raw companies datasets in chart data suitable for initializing an array of charts
   */
  public getDefaultCompanyChartData(): Observable<any[]>{
   return this.getDefaultCompanyData().pipe(map((chartData: any[]) => {
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
          labelFontSize: 0,
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
  }));

  }

  public getDefaultIndustryChartData(): Observable<any[]>{
    return this.getDefaultIndustryData().pipe(map((chartData: any[]) => {
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
           labelFontSize: 0,
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
   }));
 
   }

}
