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
import { HeaderComponent } from "../header/header.component";
import { LogoutComponent } from '../logout/logout.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-input-add-item',
    standalone: true,
    templateUrl: './input-add-item.component.html',
    styleUrl: './input-add-item.component.scss',
    imports: [NgClass, DatePipeComponent, HeaderComponent, LogoutComponent, FooterComponent]
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText') public inputText!: ElementRef;

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