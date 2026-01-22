import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

interface Product {
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
  selector: 'app-setoccasion',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './setoccasion.component.html',
  styleUrls: ['./setoccasion.component.scss'],
})
export class SetoccasionComponent {
  products: Product[] = [
    {
      id: 1,
      title: 'Titre',
      description: 'Description du produit 1',
      image: '/assets/images/lego.png',
      badge: 'Nouveauté',
      priceHT: 25.00,
      priceTTC: 30.00,
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Titre',
      description: 'Description du produit 2',
      image: '/assets/images/lego.png',
      badge: 'Promo',
      priceHT: 45.50,
      priceTTC: 54.60,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Titre',
      description: 'Description du produit 3',
      image: '/assets/images/lego.png',
      badge: 'Stock limité',
      priceHT: 89.99,
      priceTTC: 107.99,
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Titre',
      description: 'Description du produit 4',
      image: '/assets/images/lego.png',
      badge: 'Bientôt épuisé',
      priceHT: 12.49,
      priceTTC: 14.99,
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Titre',
      description: 'Description du produit 5',
      image: '/assets/images/lego.png',
      badge: 'Exclusif',
      priceHT: 199.00,
      priceTTC: 238.80,
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Titre',
      description: 'Description du produit 6',
      image: '/assets/images/lego.png',
      badge: 'Occasion',
      priceHT: 7.50,
      priceTTC: 9.00,
      isFavorite: false,
    },
    {
      id: 7,
      title: 'Titre',
      description: 'Description du produit 7',
      image: '/assets/images/lego.png',
      badge: 'Meilleure vente',
      priceHT: 59.90,
      priceTTC: 71.88,
      isFavorite: false,
    },
    {
      id: 8,
      title: 'Titre',
      description: 'Description du produit 8',
      image: '/assets/images/lego.png',
      badge: 'Dernière pièce',
      priceHT: 34.90,
      priceTTC: 41.88,
      isFavorite: false,
    },
    {
      id: 9,
      title: 'Titre',
      description: 'Description du produit 9',
      image: '/assets/images/lego.png',
      badge: 'Coup de cœur',
      priceHT: 14.99,
      priceTTC: 17.99,
      isFavorite: false,
    },
    {
      id: 10,
      title: 'Titre',
      description: 'Description du produit 10',
      image: '/assets/images/lego.png',
      badge: 'Remise spéciale',
      priceHT: 79.00,
      priceTTC: 94.80,
      isFavorite: false,
    },
  ];

  toggleFavorite(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.isFavorite = !product.isFavorite;
    }
  }

  addToCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      console.log(`Produit ajouté au panier: ${product.title}`);
      // À implémenter: appel au service panier
    }
  }
}
