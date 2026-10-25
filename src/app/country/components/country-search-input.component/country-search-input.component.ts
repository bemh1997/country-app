import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');
  debounceTimeOut = input(500);
  initialValue = input<string>();

  value = output<string>();

  inputValue = linkedSignal<string>(()=> this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTimeOut());

    onCleanup(() => {
      clearTimeout(timeOut);
    });
  });
}
