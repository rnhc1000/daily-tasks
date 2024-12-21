import { Component } from '@angular/core';
/**
 * Footer component that displays copyright, author and year
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  /** Text shown in the footer */
  copyright = 'Ricardo Ferreira - 2025 - All rights reserved'

}
