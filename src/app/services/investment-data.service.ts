import { Injectable } from '@angular/core';
import { Observable, of, pipe, map } from 'rxjs';


@Injectable()
export class InvestmentDataService {

  private defaultData: any[];
  readonly years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2022];
  readonly industries = ['Software', 'Space and foreign technology'];
  readonly companies = ['ArgusSoft', 'Andromedan Light'];
  readonly investmentCategories = [
    'CAPEX',
    'Revenue',
    'Aquisitions',
    'R&D',
    'Divestures',
  ];

  constructor() {
  }


  public getCompanyDataByInvestmentCategory(investmentCategory: string): Observable<object> {

      return of(this.getDefaultCompanyData().pipe(map((defaultCompanyData: object[]) => {

              for(let year of defaultCompanyData){
                 
                   year['total'] = 0

              }


      })));
  }

  public getDefaultCompanyData(): Observable<object> {
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
     const yearObj = {year};


      // add a million each year
      yearTotal += 1000000000;

      rtnVal.push(year);
    }

      // init the categories and their totals for each
      // by evenly dividing the total by the number of categories
      // this way it will give the mock data more integrity 
      const categoryMap = {};
      companyObj['categoryMap'] = {}
      for(let cat of this.investmentCategories){
          categoryMap[cat] = (yearTotal / this.investmentCategories.length);
      }

    }


    return of(rtnVal);
  }

  public getDefaultIndustryData(): Observable<string> {
    return of('test');
  }

  /**
   * getCompanyNames
   * @returns Array
   */
  getCompanyNames(): Observable<any> {
    return of([...this.companies]);
  }
}
