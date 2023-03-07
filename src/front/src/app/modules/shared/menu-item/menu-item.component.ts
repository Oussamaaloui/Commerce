import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  @Input('text') text: string;
  @Input('route') route: string;
  @Output('itemClicked') itemClicked: EventEmitter<void> = new EventEmitter<void>();

  itemClickedEvent(){
    this.itemClicked.emit()
  }
}
