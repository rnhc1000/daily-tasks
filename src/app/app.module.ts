import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipeComponent } from './modules/components/date-pipe/date-pipe.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { InputAddItemComponent } from './modules/components/input-add-item/input-add-item.component';
import { InputListItemComponent } from './modules/components/input-list-item/input-list-item.component';
import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/list/list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './modules/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HomeComponent,
    DatePipeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    InputAddItemComponent,
    InputListItemComponent,
    ListComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
