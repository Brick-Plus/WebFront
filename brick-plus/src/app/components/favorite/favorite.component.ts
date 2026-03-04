import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  @Input() isFavorite: boolean = false;
  @Output() favorite = new EventEmitter<boolean>();

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favorite.emit(this.isFavorite);
  }
}
