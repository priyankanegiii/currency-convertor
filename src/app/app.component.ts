import { Component  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyconverterComponent } from './components/currencyconverter/currencyconverter.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyconverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'currency-convertor';
}
