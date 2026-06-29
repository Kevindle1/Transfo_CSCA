// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserGuideComponent } from './components/user-guide/user-guide.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { ContractSectionComponent } from './components/contract-section/contract-section.component';
import { InformationComponent } from './components/information/information.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CsvService } from './services/csv.service';
import  {  ToastrModule  }  from  'ngx-toastr' ;

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    AppComponent,
    UserGuideComponent,
    SearchBarComponent,
    SearchResultsComponent,
    PersonDetailsComponent,
    ContractSectionComponent,
    InformationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    ToastrModule . forRoot ( ), 
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CsvService],
  bootstrap: [AppComponent]
})
export class AppModule { }
