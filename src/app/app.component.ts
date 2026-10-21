import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.component.html',
})
export class AppComponent {}
