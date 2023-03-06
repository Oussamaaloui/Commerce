import { Injectable } from '@angular/core';
import {  CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable()
export class CustomDateFormatter extends CalendarNativeDateFormatter  {

  public override dayViewHour({date, locale}: DateFormatterParams): string {
    let result = new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);

    return result;
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    let result = new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);

    return result;
  }

}