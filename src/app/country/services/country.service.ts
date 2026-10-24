import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { environment } from '@environments/environment';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Service()
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    return this.http
      .get<RESTCountry>(`${environment.countriesURL}/capitals`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${environment.countriesApiKey}` },
      })
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountryArray(response.data.objects)),
        catchError(error=>{
          console.log("Error fetching: ", error);

          return throwError(()=> new Error(`No se pudo obtener países con ese query ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    return this.http
      .get<RESTCountry>(`${environment.countriesURL}/names.translations`,{
        params: { q: query },
        headers: { Authorization: `Bearer ${environment.countriesApiKey}` },
      })
      .pipe(
        map((response)=>CountryMapper.mapRESTCountriesToCountryArray(response.data.objects)),
        delay(2000),
        catchError(error=>{
          console.log("Error fetching: ", error);

          return throwError(()=> new Error(`No se pudo obtener países con ese query ${query}`));
        })
      );
  }

  searchCountryByAlphaCode(code: string){
    return this.http
      .get<RESTCountry>(`${environment.countriesURL}/codes.alpha_3/${code}`,{
        headers: { Authorization: `Bearer ${environment.countriesApiKey}` },
      })
      .pipe(
        map((response)=>CountryMapper.mapRESTCountriesToCountryArray(response.data.objects)),
        map(countries => countries.at(0)),
        catchError(error=>{
          console.log("Error fetching: ", error);

          return throwError(()=> new Error(`No se pudo obtener países con ese código ISO ${code}`));
        })
      );
  }
}
