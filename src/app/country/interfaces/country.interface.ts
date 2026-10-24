import { Area } from './rest-countries.interfaces';
export interface Country {
  code: string;
  flag: Flag
  name: string;
  official: string;
  capital: string;
  population: number;
  description: string;
  region: string;
  subRegion: string;
  area: number;
  borders: string[];
}

interface Flag {
  html_entity: string;
  url_svg: string;
  description: string;
}
