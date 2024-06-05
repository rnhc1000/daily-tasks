import { Component, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

// Components
import { InputAddItemComponent } from '../../modules/components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../modules/components/input-list-item/input-list-item.component';

// Interface
import { IListItems } from '../../modules/interface/IListItems.interface';

// Enum
import { ELocalStorage } from '../../modules/enums/ELocalStorage.enum';
import { DatePipeComponent } from '../../modules/components/date-pipe/date-pipe.component';
import { HeaderComponent } from '../../modules/components/header/header.component';
import { FooterComponent } from "../../modules/components/footer/footer.component";

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    imports: [
      InputAddItemComponent, 
      InputListItemComponent, 
      DatePipeComponent,
      HeaderComponent, 
      FooterComponent
    ]
})
export class ListComponent {
  public addItem = signal(true);
  public userService!: UserService;

  #setListItems = signal<IListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();
  // public userName = this.userService.returnUser();


  #parseItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) ?? '[]');
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
  }

  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItems) => {
      if (value === 'pending') {
        return !res.checked;
      }

      if (value === 'completed') {
        return res.checked;
      }

      return res;
    });
  }

  public updateItemCheckbox(newItem: { id: string; checked: boolean }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
          return res;
        }

        return res;
      });

      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  public updateItemText(newItem: { id: string; value: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;
          return res;
        }

        return res;
      });

      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  public deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'No turning back!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, just do it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((res) => res.id !== id);
        });

        return this.#updateLocalStorage();
      }
    });
  }

  public deleteAllItems() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'No turning back!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, just do it!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
  }
}