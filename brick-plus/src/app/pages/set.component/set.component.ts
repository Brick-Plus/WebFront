import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-set',
  standalone: true,
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SetComponent {}
