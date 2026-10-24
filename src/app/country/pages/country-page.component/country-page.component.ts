import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { NotFoundErrorComponent } from '../../../shared/components/not-found-error/not-found-error.component';
import { CountryInformationComponent } from '../country-information/country-information.component';


@Component({
  selector: 'country-page',
  imports: [NotFoundErrorComponent, NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private route = inject(ActivatedRoute);
  countryCode = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('code') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('code') ?? '' },
  );
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode() }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    },
  });
}
