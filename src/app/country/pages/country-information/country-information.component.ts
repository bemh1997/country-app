import { Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, map, of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  country = input.required<Country>();
  location = inject(Location);
  countryService = inject(CountryService);
  borderIndex = signal(0);

  borderCountries = rxResource({
    params: () => ({ borders: this.country().borders }),
    stream: ({ params }) => {
      if (params.borders.length === 0) return of([]);

      return forkJoin(
        params.borders.map((borderCode) =>
          this.countryService.searchCountryByAlphaCode(borderCode),
        ),
      ).pipe(
        map((countries) =>
          countries.filter((country): country is Country => country !== undefined),
        ),
      );
    },
  });

  currentYear = computed(() => {
    return new Date().getFullYear();
  });

  showPreviousBorder() {
    const count = this.borderCountries.value()?.length ?? 0;
    if (count > 0) this.borderIndex.update((index) => (index - 1 + count) % count);
  }

  showNextBorder() {
    const count = this.borderCountries.value()?.length ?? 0;
    if (count > 0) this.borderIndex.update((index) => (index + 1) % count);
  }

  goBack() {
    this.location.back();
  }
}
