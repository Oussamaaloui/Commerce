import { Injectable } from '@angular/core';
import {  CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable()
export class CustomDateFormatter extends CalendarNativeDateFormatter  {

  public override dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }

}