import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page.component/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout.component/CountryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page.component/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page.component/by-region-page.component';
import { CountryPageComponent } from './pages/country-page.component/country-page.component';

export const countryRoutes: Routes = [
	{
		path: '',
		component: CountryLayoutComponent,
		children: [
			{
				path: 'by-capital',
				component: ByCapitalPageComponent
			},
			{
				path: 'by-country',
				component: ByCountryPageComponent
			},
			{
				path: 'by-region',
				component: ByRegionPageComponent
			},
			{
				path: 'by/:code',
				component:CountryPageComponent
			},
			{
				path:'**',
				redirectTo:'by-capital',
			}
		]
	},
	// {
	// 	path:'country'
	// },
];

export default countryRoutes;