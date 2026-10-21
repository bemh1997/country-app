import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
	placeholder = input<string>();
	value = output<string>();;
}
