import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from '../favorite/favorite.component'; // adapte le chemin si besoin

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  badge: string;
  priceHT: number;
  priceTTC: number;
  isFavorite: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FavoriteComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() favoriteToggled = new EventEmitter<number>();
  @Output() addedToCart = new EventEmitter<number>();

  toggleFavorite(): void {
    this.favoriteToggled.emit(this.product.id);
  }

  addToCart(): void {
    this.addedToCart.emit(this.product.id);
  }

  onFavoriteChange(isFavorite: boolean): void {
    this.product.isFavorite = isFavorite;
  }
}
