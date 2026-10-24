import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input.component/country-search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page.component',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) =>{
      if (!params.query) return of([]);

      return this.countryService.searchByCountry(params.query);
    }
  });
}
