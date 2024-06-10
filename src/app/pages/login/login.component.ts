import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipeComponent } from '../../modules/components/date-pipe/date-pipe.component';
import { HeaderComponent } from '../../modules/components/header/header.component';
import { FooterComponent } from '../../modules/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserToken } from '../../modules/interface/IUserToken.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule, CommonModule, DatePipeComponent, HeaderComponent, FooterComponent]
})
export class LoginComponent implements OnInit {



  @ViewChild('myForm', { static: true }) loginRegisterForm!: NgForm;
  email!: string;
  password!: string;
  formMode = false; // tru == register
  hasError = null;


  constructor(
    private authService: AuthService,
    private router: Router ) {

  }

  ngOnInit() {
    setTimeout(() => {
      // This is for later, so we don't have to enter user and pass every time
      this.loginRegisterForm.form.setValue({
        email: 'ricardo@ferreiras.dev.br',
        password: 't0d0l1st',
      });
    }, 1000);

  }

  toggleMode() {
    this.formMode = !this.formMode;
  }

  submitHandler() {
    const formValues = this.loginRegisterForm.value;
    if (this.loginRegisterForm.valid) {

      if (this.formMode) {

        this.authService.register(formValues).subscribe(
          data => this.handleSuccess(data),
          error => console.log(error)
        );

      } else {

        console.log('login');
        this.authService.login(formValues).subscribe(
          data => this.handleSuccess(data),
          error => this.handleErrors(error)
        );
      }

      console.log(this.loginRegisterForm.value);
      this.loginRegisterForm.form.reset();
    }

  }

  handleSuccess(data: UserToken) {

    this.router.navigate(['./tasks'])

  }

  handleErrors(error: any) {

    console.log(error);

  }
}
