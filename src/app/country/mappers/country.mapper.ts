import { Country } from "../interfaces/country.interface";
import { CountriesResponse, Area } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static mapRESTCountryToCountry ( item: CountriesResponse): Country {
    return {
      code: item.codes.alpha_3,
      flag: {
        html_entity: item.flag.html_entity,
        url_svg: item.flag.url_svg,
        description: item.flag.description,
      },
      name: item.names.translations["spa"].common ?? 'No existe nombre en español',
      official:item.names.translations["spa"].official ?? 'No existe nombre oficial en español',
      capital: item.capitals.map(capital=> capital.name).join(', ') ?? '',
      population: item.population,
      description: item.descriptions.long,
      region: item.region,
      subRegion: item.subregion,
      area: item.area.kilometers,
      borders: item.borders
    }
  }

  static mapRESTCountriesToCountryArray (items: CountriesResponse[]): Country[] {
		return items.map(this.mapRESTCountryToCountry);
	}
}
