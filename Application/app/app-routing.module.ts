import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { ContractSectionComponent } from './components/contract-section/contract-section.component';

const routes: Routes = [
  { path: 'search', component: SearchResultsComponent },
  { path: 'client', component: PersonDetailsComponent },
  { path: 'contract', component: ContractSectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
