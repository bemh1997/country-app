import { Component,
  inject,
  linkedSignal,
  signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { CountrySearchInputComponent } from '../../components/country-search-input.component/country-search-input.component';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-country-page.component',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activedRoute.snapshot.queryParamMap.get('q') ?? '';
  query = linkedSignal(()=>this.queryParam);

  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) =>{
      if (!params.query) return of([]);
      this.router.navigate(['country/by-country'],{
        queryParams: {
          q : params.query
        }
      });

      return this.countryService.searchByCountry(params.query);
    }
  });
}
