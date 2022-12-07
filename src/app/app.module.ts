import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
import { InvestmentDataService } from './services/investment-data.service';

@NgModule({
  declarations: [AppComponent, CanvasJSChart],
  imports: [BrowserAnimationsModule, BrowserModule, CommonModule, MatTabsModule, FormsModule],
  providers: [InvestmentDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
