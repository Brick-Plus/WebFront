import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  description: string;
  price?: number; // Ancien champ, pour compatibilité
  priceHT: number;
  priceTTC: number;
  image: string;
  badge: string;
  isFavorite: boolean;
}

export interface ProductResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private apiUrl = 'http://localhost:8080/api/products';
  private useMockData = true; // Basculer à false quand l'API est prête

  constructor(private http: HttpClient) {}

  /**
   * Récupère les produits (API ou mock selon configuration)
   */
  getProducts(page: number, size: number, filters: any): Observable<ProductResponse> {
    if (this.useMockData) {
      return this.getMockProducts(page, size, filters);
    }

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters.search) params = params.set('search', filters.search);
    if (filters.sort) params = params.set('sort', filters.sort);
    if (filters.category) params = params.set('category', filters.category);

    return this.http.get<ProductResponse>(this.apiUrl, { params })
      .pipe(catchError(() => this.getMockProducts(page, size, filters)));
  }

  /**
   * Ajoute au panier
   */
  addToCart(productId: number): Observable<any> {
    if (this.useMockData) {
      return of({ success: true });
    }

    return this.http.post(`${this.apiUrl}/${productId}/cart`, { quantity: 1 })
      .pipe(catchError(() => of({ success: true })));
  }

  /**
   * Toggle favori
   */
  toggleFavorite(productId: number): Observable<any> {
    if (this.useMockData) {
      return of({ success: true });
    }

    return this.http.post(`${this.apiUrl}/${productId}/favorite`, {})
      .pipe(catchError(() => of({ success: true })));
  }

  /**
   * Données mock pour le développement
   */
  private getMockProducts(page: number, size: number, filters: any): Observable<ProductResponse> {
    let products = [...this.mockProducts];

    // Filtrage
    if (filters.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // Tri
    if (filters.sort === 'price-asc') {
      products = products.sort((a, b) => a.priceHT - b.priceHT);
    } else if (filters.sort === 'price-desc') {
      products = products.sort((a, b) => b.priceHT - a.priceHT);
    } else if (filters.sort === 'name') {
      products = products.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Pagination
    const total = products.length;
    const start = page * size;
    const paginated = products.slice(start, start + size);

    return of({
      content: paginated,
      totalPages: Math.ceil(total / size),
      totalElements: total,
      currentPage: page,
      pageSize: size
    });
  }

  private mockProducts: Product[] = [
    {
      id: 1,
      title: 'City Grand Hôtel',
      description: 'Set complet avec 3000+ briques, structure intacte et tous les minifigures incluses',
      image: '/images/temp_images/dis038 LEGO Disney – Sally.png',
      badge: 'Nouveauté',
      priceHT: 25.00,
      priceTTC: 30.00,
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Star Wars Millennium Falcon',
      description: 'Édition 2014, légèrement utilisé, toutes les pièces et instructions présentes',
      image: '/images/temp_images/sh0078 LEGO DC - General Zod.png',
      badge: 'Promo',
      priceHT: 45.50,
      priceTTC: 54.60,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Technic Ferrari F40',
      description: 'Véhicule motorisé avec moteurs inclus, très bon état, fonctionnel',
      image: '/images/temp_images/sh0177 LEGO Marvel – Captain America.png',
      badge: 'Stock limité',
      priceHT: 89.99,
      priceTTC: 107.99,
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Friends Maison des Rêves',
      description: 'Construction modulable, 1200 pièces, parfait pour jeune créateur',
      image: '/images/temp_images/sw0299 LEGO Star Wars – Clone Bomb Squad Trooper.png',
      badge: 'Bientôt épuisé',
      priceHT: 12.49,
      priceTTC: 14.99,
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Creator Expert Titanic',
      description: 'Édition limitée officielle, 9000+ pièces, état neuf en boîte d\'origine',
      image: '/images/temp_images/sw0346 LEGO Star Wars – Princess Leia – Hoth Outfit.png',
      badge: 'Exclusif',
      priceHT: 199.00,
      priceTTC: 238.80,
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Classic Assortiment Couleurs',
      description: 'Boîte mixte 500 pièces variées, idéale pour débuter les constructions libres',
      image: '/images/temp_images/sw0380 LEGO Star Wars – Clone Trooper Commander Gree.png',
      badge: 'Occasion',
      priceHT: 7.50,
      priceTTC: 9.00,
      isFavorite: false,
    },
    {
      id: 7,
      title: 'Architecture Tour Eiffel',
      description: 'Modèle iconique avec socle, 325 pièces, décoration élégante et moderne',
      image: '/images/temp_images/sw0524 LEGO Star Wars – BARC Trooper.png',
      badge: 'Meilleure vente',
      priceHT: 59.90,
      priceTTC: 71.88,
      isFavorite: false,
    },
    {
      id: 8,
      title: 'Ninjago Temple d\'Airjitzu',
      description: 'Grand ensemble avec 2000+ pièces et 6 figurines ninja, très détaillé',
      image: '/images/temp_images/sw0543 LEGO Star Wars – Imperial TIE Fighter Pilot.png',
      badge: 'Dernière pièce',
      priceHT: 34.90,
      priceTTC: 41.88,
      isFavorite: false,
    },
    {
      id: 9,
      title: 'Harry Potter Château Poudlard',
      description: 'Réplique magique du château, 6000+ pièces, structure imposante et collectible',
      image: '/images/temp_images/sw0570 LEGO Star Wars – Ithorian Jedi Master (Noga-ta).png',
      badge: 'Coup de cœur',
      priceHT: 14.99,
      priceTTC: 17.99,
      isFavorite: false,
    },
    {
      id: 10,
      title: 'Icons Bouquet Fleurs',
      description: 'Set fleural avec 939 pièces, fleurs réalistes et vase élégant pour décoration',
      image: '/images/temp_images/sw0613 LEGO Star Wars – Senate Commando Captain.png',
      badge: 'Remise spéciale',
      priceHT: 79.00,
      priceTTC: 94.80,
      isFavorite: false,
    },
  ];
}
