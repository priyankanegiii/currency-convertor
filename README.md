# Currency Converter App

A simple Angular application that converts an amount from any selected currency to any other selected currency using live exchange rates fetched from an API. Users can choose both the source and target currencies from searchable dropdowns, and conversion results update instantly as they type or change selections.

## 🚀 Features

* **Live Exchange Rates:** Fetches real-time currency rates from an exchange rate API.
* **Default INR Conversion:** Converts amounts from any selected currency to a other any selected currency.
* **Searchable Currency Dropdown:** Easily search and select from a large list of currencies.
* **Real-Time Updates:** Conversion result updates instantly when the amount or currency changes.
* **Responsive Design:** Clean and mobile-friendly UI built with Angular and Tailwind CSS.
* **API Integration:** Uses Angular services and HTTP Client to fetch exchange rate data.
* **Type Safety:** Uses TypeScript interfaces for API response handling.

## 🛠️ Tech Stack

* Angular 18+
* TypeScript
* Reactive Forms
* Angular HTTP Client
* Tailwind CSS
* HTML
* CSS

## 📂 Project Structure

```text
currency-converter/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── currencyconverter/
│   │   │       ├── currencyconverter.component.ts
│   │   │       ├── currencyconverter.component.html
│   │   │       ├── currencyconverter.component.scss
│   │   │       └── currencyconverter.component.spec.ts
│   │   │
│   │   ├── models/
│   │   │   └── exchangerateresponse.model.ts
│   │   │
│   │   ├── services/
│   │   │   └── currency.service.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── angular.json
├── package.json
├── tailwind.config.js
└── README.md
```

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/priyankanegiii/currency-converter.git
```

## 2. Navigate to the Project Folder

```bash
cd currency-converter
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Run the Application

```bash
ng serve
```

## 5. Open in Browser

```bash
http://localhost:4200
```

Or visit the deployed version:

```bash
https://currency-convertor-black-one.vercel.app/
```

## 🔄 How It Works

1. Enter an amount in INR.
2. Search and select a target currency from the dropdown.
3. The application fetches live exchange rates.
4. The converted amount is displayed instantly.
5. Exchange rates update automatically whenever new data is fetched.


## 📊 API Response Model

```typescript
export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  time_last_update_utc: string;
  rates: {
    [key: string]: number;
  };
}
```

---

<div align="center">

## Made with ❤️ using Angular & Tailwind CSS

*Currency Converter - Fast, accurate, and real-time currency conversions.*

</div>

