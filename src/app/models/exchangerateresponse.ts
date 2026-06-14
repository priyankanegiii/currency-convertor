export interface ExchangeRateResponse {
    result : string;
    base_code : string;
    time_last_update_utc : string;
    rates :{
        [key: string]: number;
 };
}