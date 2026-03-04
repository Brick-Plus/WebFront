import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img [src]="src" [alt]="alt" [style.width.px]="size" [style.height.px]="size" [class]="class" />
  `,
})
export class IconComponent {
  @Input() name = '';
  @Input() size = 24;
  @Input() alt = '';
  @Input() class = '';

  get src(): string {
    return this.iconService.getIconPath(this.name || '');
  }

  constructor(private iconService: IconService) {}
}
