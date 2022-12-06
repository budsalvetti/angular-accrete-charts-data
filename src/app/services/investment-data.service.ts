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

  /**
   * getCompanyDataByInvestmentCategory
   * 
   * @description acts similar to http_client behavior as it returns an observable with an Array
   * as http_client also parses returned JSON into javascript objects so this is a decent mock
   * @returns Observable<object>
   */
  public getCompanyDataByInvestmentCategory(investmentCategory: string): Observable<object> {

      return of(this.getDefaultCompanyData().pipe(map((defaultCompanyData: object[]) => {
              for(let company of defaultCompanyData){
                    for(let year of company['years']){
                      year.total = year.investmentCatMap[investmentCategory].total;
                    } 
              }
              return defaultCompanyData;
      })));
  }

  /**
   * getDefaultCompanyData
   * @returns Observable<object>
   */
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

     yearObj['total'] = yearTotal;

      // add a million each year
      yearTotal += 1000000000;

      companyObj['years'].push(yearObj);
    }

    rtnVal.push(company)
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
