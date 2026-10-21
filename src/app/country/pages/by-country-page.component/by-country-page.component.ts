import { Component } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input.component/country-search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';

@Component({
  selector: 'app-by-country-page.component',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {}
