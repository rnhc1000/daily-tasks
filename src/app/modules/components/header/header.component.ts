import { Component, OnInit } from '@angular/core';
import { AuthService, UserData } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[ CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit{
  user?: UserData;

  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.authService.userChange.subscribe(
      (data: UserData) => {
        this.user = data;
      }
    );;
  }

}
