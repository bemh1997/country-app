import {
  Component,
  inject,
  //resource,
  signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountrySearchInputComponent } from '../../components/country-search-input.component/country-search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';
import { __param } from 'tslib';

// import { firstValueFrom } from 'rxjs';

// import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  // =====================Con Resource rxjs =================================
  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) =>{
      if (!params.query) return of([]);

      return this.countryService.searchByCapital(params.query);
    }
  });

  // =====================Con Resource Nativo =================================
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCapital(params.query));
  //   },
  // });

  // ===================Sin ningún tipo de resource=============================
  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (error) =>{
  //       console.log('Error fetching', error);
  //     }
  //   });
  // }
}
