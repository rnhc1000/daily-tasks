import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
  } from '@angular/core';

// Interfaces
import { NgClass } from '@angular/common';
import { IListItems } from '../../interface/IListItems.interface';
import { DatePipeComponent } from "../date-pipe/date-pipe.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { LogoutComponent } from '../logout/logout.component';
import { FooterComponent } from '../footer/footer.component';
/**
 * # INPUT-ADD Component
 * 
 * This component is used to display content inside a card layout. 
 * You can customize the title and content of the card using input properties.
 * 
 * ## Features
 * - *Custom Title:* Set the title of the card.
 * - *Custom Content:* Set the content inside the card.
 * - *Responsive Design:* Adjusts to fit different screen sizes.
 * 
 * ## Usage
 * html
 * <app-card title="Card Title" content="Card content goes here"></app-card>
 * 
 * 
 * ## Inputs
 * | Property | Type   | Description             |
 * |----------|--------|-------------------------|
 * | title  | string | The title of the card.  |
 * | content| string | The main content inside the card. |
 * 
 * ## Author
 * Developed by [Ricardo Ferreira](https://github.com/rnhc1000).
 */

@Component({
    selector: 'app-input-add-item',
    standalone: true,
    templateUrl: './input-add-item.component.html',
    styleUrl: './input-add-item.component.scss',
    imports: [NgClass, DatePipeComponent, NavbarComponent, LogoutComponent, FooterComponent]
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText') public inputText!: ElementRef;
  
  // @Input() public nomeUsuario!: string;

  @Input({ required: true }) public inputListItems: IListItems[] = [];

  @Output() public outputAddListItem = new EventEmitter<IListItems>();
  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListItem.emit({
        id,
        checked: false,
        value,
      });

      return this.inputText.nativeElement.focus();
    }
  }
}