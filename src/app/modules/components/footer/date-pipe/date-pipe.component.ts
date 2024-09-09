import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'date-pipe',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
    <h2 class="date-pipe-text"> {{ date | date:'fullDate' }} </h2>
  </div>
  `
})
export class DatePipeComponent {

  date: Date = new Date();
  
}
