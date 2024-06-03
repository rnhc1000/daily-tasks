import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipeComponent } from '../../modules/components/date-pipe/date-pipe.component';
import { FooterComponent } from '../../modules/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule, CommonModule, DatePipeComponent, FooterComponent]
})
export class LoginComponent implements OnInit{

  @ViewChild('myForm', { static: true }) loginRegisterForm!: NgForm;

    constructor() {
      
    }

    ngOnInit() {
      setTimeout(() => {
        // This is for later, so we don't have to enter user and pass every time
        this.loginRegisterForm.form.setValue({
          email: 'francis@gmail.com',
          password: 'testing123',
        });
      }, 1000);

    }
  
    submitHandler() {
      if (this.loginRegisterForm.valid) {
        console.log(this.loginRegisterForm.value);
        this.loginRegisterForm.form.reset();
  
      }

    }
}
