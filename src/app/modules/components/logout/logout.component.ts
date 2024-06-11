import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  imports: [ RouterLink],
  styleUrl: './logout.component.scss'
})
export class LogoutComponent  {

}
