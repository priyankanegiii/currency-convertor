import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { ExchangeRateResponse } from '../../models/exchangerateresponse';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  //component decorator
  selector: 'currencyconvertercomponent',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './currencyconverter.component.html',
  styleUrl: './currencyconverter.component.scss',
})
export class CurrencyconverterComponent implements OnInit {
  //component class

  rates: { [key: string]: number } = {}; //to store rates
  currencyCodes: string[] = []; // to store list of currencies
  fromfilteredCurrencies: string[] = [];
  tofilteredCurrencies: string[] = [];
  convertedAmount: number | null = null;
  loading: boolean = true;
  date : string = '';

  amountForm = new FormGroup({
    //form group and form label for amounts
    amount: new FormControl(' ', [Validators.required, Validators.min(1)]),
  });

  fromcurrencyControl = new FormControl('INR' ,[ Validators.required ,Validators.min(1) ]); //form control for from currency
  tocurrencyControl = new FormControl('', Validators.required);

  //to use the currency service to fetch the exchange rates
  constructor(private currencyService: CurrencyService) {}

  //the ngOnInit lifecycle hook to fetch the exchange rates when the component initializes
  ngOnInit() {
    this.currencyService
      .getData(this.fromcurrencyControl.value || 'INR')
      .subscribe({
        next: (data: ExchangeRateResponse) => {
          console.log('Exchange rates fetched successfully:', data);
          this.rates = data.rates;
          this.currencyCodes = Object.keys(this.rates);
          this.fromfilteredCurrencies = [];
          this.tofilteredCurrencies = [];
          this.showToast();
          this.loading = false;
          this.date = data.time_last_update_utc;
          console.log('Date of last update:', this.date.substring(0, 5));
        },
        error: (error) => {
          console.error('Error fetching exchange rates:', error);
          this.loading = true;
        },
      });

    this.fromcurrencyControl.valueChanges.subscribe((value) => {
      const search = (value || '').toUpperCase();

      if (!search) {
        this.fromfilteredCurrencies = [];
        return;
      }

      this.fromfilteredCurrencies = this.currencyCodes.filter((fromcurrency) =>
        fromcurrency.includes(search),
      );
    });

    this.tocurrencyControl.valueChanges.subscribe((value) => {
      const search = (value || '').toUpperCase();

      if (!search) {
        this.tofilteredCurrencies = [];
        return;
      }

      this.tofilteredCurrencies = this.currencyCodes.filter((tocurrency) =>
        tocurrency.includes(search),
      );
    });


   this.amountForm.get('amount')?.valueChanges.subscribe((value)=>{
      const data =Number(value) || 0;
      this.convertCurrency(data,this.tocurrencyControl.value || '');
   })

   
  }

  


  fromselectCurrency(fromcurrency: string) {
    this.fromcurrencyControl.setValue(fromcurrency);
    this.fromfilteredCurrencies = [];
    this.showToast();
    this.convertCurrency(Number(this.amountForm.get('amount')?.value) || 0, this.tocurrencyControl.value || '');
    

    this.currencyService.getData(fromcurrency).subscribe({
      next: (data) => {
        console.log('SUCCESS', data);
        this.rates = data.rates;
        this.loading = false;
      },
      error: (err) => {
        console.log('ERROR', err);
        this.loading = true;
      },
    });
  }

  toselectCurrency(tocurrency: string) {
    this.tocurrencyControl.setValue(tocurrency);
    this.tofilteredCurrencies = [];
    this.convertCurrency(Number(this.amountForm.get('amount')?.value) || 0, tocurrency);
  }


  convertCurrency(amt : Number , toCurrency : string) {                                         //methd to convert the currency based on the amount and the target currency
    this.convertedAmount = Number(amt) * (this.rates[toCurrency] || 0);
    this.convertedAmount = parseFloat(this.convertedAmount.toFixed(2));
    return this.convertedAmount;

  }

   preventNegative(event: KeyboardEvent) {
  if (event.key === '-') {
    event.preventDefault();
  }
}

 get currencycontrol(){
  return this.amountForm.get('amount');
 }

 
 get fromcontrol(){
  if(this.currencyCodes.includes(String(this.fromcurrencyControl.value ))){
  return this.fromcurrencyControl.value;
 }
 else{
  return null;
 }

 

 }

 get tocontrol(){
  if(this.currencyCodes.includes(String(this.tocurrencyControl.value ))){
  return this.tocurrencyControl.value;
 }
 else{
   return null;
 }

 }
 
 temp : string='';
 swap(){
  this.temp=this.fromcurrencyControl.value || '';
  this.fromcurrencyControl.setValue(this.tocurrencyControl.value || '');
  this.tocurrencyControl.setValue(this.temp || '');
 
  
  
 }

 showMessage = false;

showToast() {
  this.showMessage = true;

  setTimeout(() => {
    this.showMessage = false;
  }, 3000); // 3 seconds
}
}
