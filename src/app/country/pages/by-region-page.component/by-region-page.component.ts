import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import type { Region } from '../../interfaces/region.interface';
import { CountryListComponent } from '../../components/country-list.component/country-list.component';
import { CountryService } from './../../services/country.service';
import { of } from 'rxjs';


function validateQueryParams(queryParams: string): Region {
  queryParams = queryParams.toLowerCase();
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  }

  return validRegions[queryParams] ?? 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('reg') ?? '';
  selectedRegion = linkedSignal<Region>(() => validateQueryParams(this.queryParams));

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
    this.router.navigate(['/country/by-region'], {
      queryParams: {
        reg: region,
      },
    });
  }

  countryResource = rxResource({
    params: () => ({ query: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByRegion(params.query);
    },
  });
}
