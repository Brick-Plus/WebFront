import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isFavorite?: boolean;
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
      products = products.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      products = products.sort((a, b) => b.price - a.price);
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
      title: 'LEGO Creator Expert La Tour Eiffel',
      description: 'Construisez la célèbre Tour Eiffel avec ce set détaillé de 10307 pièces',
      price: 629.99,
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 2,
      title: 'LEGO Star Wars Millennium Falcon',
      description: 'Le vaisseau iconique avec 7541 pièces et figurines incluses',
      price: 849.99,
      image: 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=400&fit=crop',
      isFavorite: true
    },
    {
      id: 3,
      title: 'LEGO Technic Bugatti Chiron',
      description: 'Reproduction fidèle de la supercar avec système de transmission',
      price: 379.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 4,
      title: 'LEGO Harry Potter Château de Poudlard',
      description: 'Le château magique complet avec 6020 pièces et de nombreuses salles',
      price: 469.99,
      image: 'https://th.bing.com/th/id/R.3cf682288d8b05d74ec46abcb03b4c68?rik=hvx6n5Z6sogASw&pid=ImgRaw&r=0',
      isFavorite: false
    },
    {
      id: 5,
      title: 'LEGO Ideas Piano à Queue',
      description: 'Piano fonctionnel avec mécanisme de touches automatique',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop',
      isFavorite: true
    },
    {
      id: 6,
      title: 'LEGO Architecture Colisée',
      description: 'Réplique authentique du Colisée romain avec 9036 pièces',
      price: 549.99,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 7,
      title: 'LEGO City Station Spatiale Lunaire',
      description: 'Station spatiale modulaire avec modules scientifiques',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 8,
      title: 'LEGO Ninjago Temple Dragon',
      description: 'Temple asiatique avec dragon articulé et 6 figurines ninja',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 9,
      title: 'LEGO Friends Parc aquatique',
      description: 'Parc aquatique avec toboggans et piscine à vagues',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 10,
      title: 'LEGO Marvel Avengers Tower',
      description: 'La tour des Avengers avec tous vos héros préférés',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 11,
      title: 'LEGO Speed Champions Ferrari',
      description: 'Collection de voitures Ferrari iconiques',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=400&fit=crop',
      isFavorite: false
    },
    {
      id: 12,
      title: 'LEGO Creator Expert Boutique',
      description: 'Boutique de détail modulaire à 3 étages',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f9582?w=400&h=400&fit=crop',
      isFavorite: false
    }
  ];
}