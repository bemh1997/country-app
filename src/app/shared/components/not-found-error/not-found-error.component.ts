import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found-error',
  imports: [],
  templateUrl: './not-found-error.component.html'
})
export class NotFoundErrorComponent {
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
