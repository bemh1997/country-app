import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { environment } from '@environments/environment';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Service()
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCacheCapital.has(query)) {
      console.log(`Tenemos la llave ${query}`);
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`Sin llave ${query} llendo al servidor`);
    return this.http
      .get<RESTCountry>(`${environment.countriesURL}/capitals`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${environment.countriesApiKey}` },
      })
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountryArray(response.data.objects)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching: ', error);

          return throwError(() => new Error(`No se pudo obtener países con ese query ${query}`));
        }),
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    if (this.queryCacheCountry.has(query)) {
      console.log(`Tenemos la llave ${query}`);
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.log(`Sin llave ${query} llendo al servidor`);
    return this.http
      .get<RESTCountry>(`${environment.countriesURL}/names.translations`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${environment.countriesApiKey}` },
      })
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountryArray(response.data.objects)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching: ', error);

          return throwError(() => new Error(`No se pudo obtener países con ese query ${query}`));
        }),
      );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http
      .get<RESTCountry>(`${environment.countriesURL}/codes.alpha_3/${code}`, {
        headers: { Authorization: `Bearer ${environment.countriesApiKey}` },
      })
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountryArray(response.data.objects)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log('Error fetching: ', error);

          return throwError(
            () => new Error(`No se pudo obtener países con ese código ISO ${code}`),
          );
        }),
      );
  }

  searchByRegion(query: string): Observable<Country[]> {
    if (this.queryCacheRegion.has(query)) {
      console.log(`Tenemos la llave ${query}`);
      return of(this.queryCacheRegion.get(query) ?? []);
    }

    console.log(`Sin llave ${query} llendo al servidor`);
    return this.http
      .get<RESTCountry>(`${environment.countriesURL}/region`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${environment.countriesApiKey}` },
      })
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountryArray(response.data.objects)),
        tap((countries) => this.queryCacheRegion.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching: ', error);

          return throwError(() => new Error(`No se pudo obtener países con ese query ${query}`));
        }),
      );
  }
}
