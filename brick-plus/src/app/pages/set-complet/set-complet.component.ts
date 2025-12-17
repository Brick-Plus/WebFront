import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-set',
  standalone: true,
  templateUrl: './set-complet.component.html',
  styleUrls: ['./set-complet.component.scss'],
  imports: [
    CommonModule,
    HeaderComponent,
  ]
})

export class SetCompletComponent {}