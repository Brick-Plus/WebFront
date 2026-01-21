import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-setneuf.component',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './setneuf.component.html',
  styleUrls: ['./setneuf.component.scss'],
})
export class SetneufComponent {}
