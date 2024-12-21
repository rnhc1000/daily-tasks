import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
/**
 * Date Component to show date and time
 */
@Component({
  selector: 'date-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-pipe.component.html'
})
export class DatePipeComponent {

  /** Date and Time shown */
  date: Date = new Date();
  
}
