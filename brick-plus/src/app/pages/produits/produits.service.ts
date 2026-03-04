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
      title: 'Sally – LEGO Disney',
      description: 'Minifigurine du personnage Sally tirée de l\'univers Disney, parfait pour les collectionneurs de minifigures',
      image: '/images/temp_images/sally.png',
      badge: 'Nouveauté',
      priceHT: 25.00,
      priceTTC: 30.00,
      isFavorite: false,
    },
    {
      id: 2,
      title: 'General Zod – LEGO DC',
      description: 'Minifigurine du redoutable General Zod, superbe détail imprimé, idéale pour une collection DC Comics',
      image: '/images/temp_images/general-zod.png',
      badge: 'Promo',
      priceHT: 45.50,
      priceTTC: 54.60,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Captain America – LEGO Marvel',
      description: 'Minifigurine de Captain America avec son bouclier iconique et ses attributs Marvel officiels',
      image: '/images/temp_images/captain-america.png',
      badge: 'Stock limité',
      priceHT: 89.99,
      priceTTC: 107.99,
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Clone Bomb Squad Trooper – LEGO Star Wars',
      description: 'Minifigurine du Clone Bomb Squad Trooper en exclusivité, armure détaillée et accessoires authentiques',
      image: '/images/temp_images/clone-bomb-squad-trooper.png',
      badge: 'Bientôt épuisé',
      priceHT: 12.49,
      priceTTC: 14.99,
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Princess Leia Hoth – LEGO Star Wars',
      description: 'Minifigurine de Princess Leia en tenue de Hoth avec ses accessoires classiques de La Guerre des Étoiles',
      image: '/images/temp_images/princess-leia-hoth.png',
      badge: 'Exclusif',
      priceHT: 199.00,
      priceTTC: 238.80,
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Clone Trooper Commander Gree – LEGO Star Wars',
      description: 'Minifigurine du Clone Commander Gree avec détails d\'unité exceptionnels et armes de guerre',
      image: '/images/temp_images/commander-gree.png',
      badge: 'Occasion',
      priceHT: 7.50,
      priceTTC: 9.00,
      isFavorite: false,
    },
    {
      id: 7,
      title: 'BARC Trooper – LEGO Star Wars',
      description: 'Minifigurine du BARC Trooper, cavalier d\'élite de l\'Empire avec armure de reconnaissance bleue',
      image: '/images/temp_images/barc-trooper.png',
      badge: 'Meilleure vente',
      priceHT: 59.90,
      priceTTC: 71.88,
      isFavorite: false,
    },
    {
      id: 8,
      title: 'Imperial TIE Fighter Pilot – LEGO Star Wars',
      description: 'Minifigurine du pilote TIE Impérial avec casque noir distinctif et armure de combat complète',
      image: '/images/temp_images/tie-fighter-pilot.png',
      badge: 'Dernière pièce',
      priceHT: 34.90,
      priceTTC: 41.88,
      isFavorite: false,
    },
    {
      id: 9,
      title: 'Ithorian Jedi Master – LEGO Star Wars',
      description: 'Minifigurine du Maître Jedi Ithorien avec sa robe d\'ordre Jedi et son sabre laser bleu',
      image: '/images/temp_images/ithorian-jedi-master.png',
      badge: 'Coup de cœur',
      priceHT: 14.99,
      priceTTC: 17.99,
      isFavorite: false,
    },
    {
      id: 10,
      title: 'Senate Commando Captain – LEGO Star Wars',
      description: 'Minifigurine du Capitaine Commando du Sénat avec armure rouge distinctive et équipement tactique',
      image: '/images/temp_images/senate-commando-captain.png',
      badge: 'Remise spéciale',
      priceHT: 79.00,
      priceTTC: 94.80,
      isFavorite: false,
    },
    {
      id: 11,
      title: 'Klatooinian Raider – LEGO Star Wars',
      description: 'Son look de pillard, renforcé par des pièces d’équipement spécifiques et des impressions de tenue usée, en fait un choix solide pour les scènes de combat et les dioramas.',
      image: '/images/temp_images/klatooinian-raider.png',
      badge: 'Stock limité',
      priceHT: 35.99,
      priceTTC: 43.19,
      isFavorite: false,
    },
    {
      id: 12,
      title: 'Captain Rex – LEGO Star Wars',
      description: 'Avec son marquage 501st et son équipement distinctif (visière, épaulette et kama), elle s’impose comme une pièce très recherchée pour compléter une escouade clone ou une collection dédiée aux personnages clés de la série.',
      image: '/images/temp_images/captain-rex.png',
      badge: 'Coup de cœur',
      priceHT: 64.99,
      priceTTC: 77.99,
      isFavorite: false,
    },
    {
      id: 13,
      title: 'Anakin Skywalker – LEGO Star Wars',
      description: 'Exclusive au set 75183 Darth Vader Transformation, c’est une pièce forte pour les collectionneurs qui ciblent les scènes iconiques et les variantes de personnages marquantes.',
      image: '/images/temp_images/anakin-skywalker.png',
      badge: 'Exclusif',
      priceHT: 99.90,
      priceTTC: 119.88,
      isFavorite: false,
    },
    {
      id: 14,
      title: 'Resistance Trooper – LEGO Star Wars',
      description: 'Exclusive au Battle Pack 75131, elle combine un équipement de trooper très identifiable et un visage expressif, idéale pour construire une escouade crédible face au Premier Ordre.',
      image: '/images/temp_images/resistance-trooper.png',
      badge: 'Dernière pièce',
      priceHT: 22.50,
      priceTTC: 27.00,
      isFavorite: false,
    },
  ];
}
