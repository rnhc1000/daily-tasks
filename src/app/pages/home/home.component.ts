import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../modules/components/footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [RouterLink, FooterComponent]
})
export class HomeComponent {

}
