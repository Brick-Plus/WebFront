import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent, Product } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-setoccasion',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, ProductCardComponent],
  templateUrl: './setoccasion.component.html',
  styleUrls: ['./setoccasion.component.scss'],
})
export class SetoccasionComponent {
  products: Product[] = [
    {
      id: 1,
      title: 'City Grand Hôtel',
      description: 'Set complet avec 3000+ briques, structure intacte et tous les minifigures incluses',
      image: '/assets/images/temp_images/dis038 LEGO Disney – Sally.png',
      badge: 'Nouveauté',
      priceHT: 25.00,
      priceTTC: 30.00,
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Star Wars Millennium Falcon',
      description: 'Édition 2014, légèrement utilisé, toutes les pièces et instructions présentes',
      image: '/assets/images/temp_images/sh0078 LEGO DC - General Zod.png',
      badge: 'Promo',
      priceHT: 45.50,
      priceTTC: 54.60,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Technic Ferrari F40',
      description: 'Véhicule motorisé avec moteurs inclus, très bon état, fonctionnel',
      image: '/assets/images/temp_images/sh0177 LEGO Marvel – Captain America.png',
      badge: 'Stock limité',
      priceHT: 89.99,
      priceTTC: 107.99,
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Friends Maison des Rêves',
      description: 'Construction modulable, 1200 pièces, parfait pour jeune créateur',
      image: '/assets/images/temp_images/sw0299 LEGO Star Wars – Clone Bomb Squad Trooper.png',
      badge: 'Bientôt épuisé',
      priceHT: 12.49,
      priceTTC: 14.99,
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Creator Expert Titanic',
      description: 'Édition limitée officielle, 9000+ pièces, état neuf en boîte d\'origine',
      image: '/assets/images/temp_images/sw0346 LEGO Star Wars – Princess Leia – Hoth Outfit.png',
      badge: 'Exclusif',
      priceHT: 199.00,
      priceTTC: 238.80,
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Classic Assortiment Couleurs',
      description: 'Boîte mixte 500 pièces variées, idéale pour débuter les constructions libres',
      image: '/assets/images/temp_images/sw0380 LEGO Star Wars – Clone Trooper Commander Gree.png',
      badge: 'Occasion',
      priceHT: 7.50,
      priceTTC: 9.00,
      isFavorite: false,
    },
    {
      id: 7,
      title: 'Architecture Tour Eiffel',
      description: 'Modèle iconique avec socle, 325 pièces, décoration élégante et moderne',
      image: '/assets/images/temp_images/sw0524 LEGO Star Wars – BARC Trooper.png',
      badge: 'Meilleure vente',
      priceHT: 59.90,
      priceTTC: 71.88,
      isFavorite: false,
    },
    {
      id: 8,
      title: 'Ninjago Temple d\'Airjitzu',
      description: 'Grand ensemble avec 2000+ pièces et 6 figurines ninja, très détaillé',
      image: '/assets/images/temp_images/sw0543 LEGO Star Wars – Imperial TIE Fighter Pilot.png',
      badge: 'Dernière pièce',
      priceHT: 34.90,
      priceTTC: 41.88,
      isFavorite: false,
    },
    {
      id: 9,
      title: 'Harry Potter Château Poudlard',
      description: 'Réplique magique du château, 6000+ pièces, structure imposante et collectible',
      image: '/assets/images/temp_images/sw0570 LEGO Star Wars – Ithorian Jedi Master (Noga-ta).png',
      badge: 'Coup de cœur',
      priceHT: 14.99,
      priceTTC: 17.99,
      isFavorite: false,
    },
    {
      id: 10,
      title: 'Icons Bouquet Fleurs',
      description: 'Set fleural avec 939 pièces, fleurs réalistes et vase élégant pour décoration',
      image: '/assets/images/temp_images/sw0613 LEGO Star Wars – Senate Commando Captain.png',
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
