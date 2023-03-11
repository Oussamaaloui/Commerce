import {Component, Input} from '@angular/core';
import {PercentPipe} from "@angular/common";

@Component({
  selector: 'app-pie-chart-wrapper',
  template: `
    <dx-pie-chart
      id="pie-type-rdv"
      type="doughnut"
      [title]="title"
      palette="Soft Pastel"
      [dataSource]="datasource"
    >
      <dxo-size
        [height]="270">
      </dxo-size>
      <dxi-series argumentField="key">
        <dxo-label [visible]="true" >
          <dxo-connector [visible]="true"></dxo-connector>
        </dxo-label>
      </dxi-series>
      <dxo-legend
        [margin]="0"
        horizontalAlignment="right"
        verticalAlignment="top"
      ></dxo-legend>
      <dxo-tooltip
        [enabled]="true"
        [customizeTooltip]="customizeTooltip"
      >
      </dxo-tooltip>
    </dx-pie-chart>
  `,
  styleUrls: ['./pie-chart-wrapper.component.css']
})
export class PieChartWrapperComponent<PieChartData> {
  @Input("datasource") datasource: PieChartData[] = [];
  @Input("title") title: string = '';

  pipe: any = new PercentPipe('fr-FR');

  customizeTooltip = (arg: any) => ({
    text: `${arg.valueText} - ${this.pipe.transform(arg.percent, '1.2-2')}`,
  });
}

