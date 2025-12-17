import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isFavorite?: boolean;
  category?: string;
  stock?: number;
  isNew?: boolean;
  isPromo?: boolean;
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

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des produits avec pagination, recherche, tri et filtres
   * TODO Backend: Implémenter l'endpoint GET /api/products avec les paramètres:
   * - page: number (index de la page, commence à 0)
   * - size: number (nombre de produits par page)
   * - search: string (recherche dans title et description)
   * - sort: string (price-asc, price-desc, name, date)
   * - filter: string (new, popular, promo, stock)
   */
  getProducts(
    page: number = 0,
    size: number = 8,
    search?: string,
    sortBy?: string,
    filter?: string
  ): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (sortBy) {
      params = params.set('sort', sortBy);
    }

    if (filter) {
      params = params.set('filter', filter);
    }

    console.log('🔍 Appel API avec params:', { page, size, search, sortBy, filter });

    return this.http.get<ProductResponse>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        // En cas d'erreur backend, utilise des données statiques pour le développement
        console.warn(' Backend non disponible - Utilisation de données statiques');
        console.error('Détails erreur:', error);
        return of(this.getStaticProducts(page, size, search, sortBy, filter));
      })
    );
  }

  /**
   * Récupère un produit par son ID
   * TODO Backend: Implémenter l'endpoint GET /api/products/{id}
   */
  getProductById(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const product = this.staticProducts.find(p => p.id === id);
        return of(product || null);
      })
    );
  }

  /**
   * Ajoute un produit au panier
   * TODO Backend: Implémenter l'endpoint POST /api/products/{id}/cart
   * Body attendu: { quantity: number }
   * Response attendue: { success: boolean, message: string, cartItemCount: number }
   */
  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/cart`, { quantity }).pipe(
      catchError(() => {
        console.log(` [DEV] Produit ${productId} ajouté au panier (quantité: ${quantity})`);
        return of({ 
          success: true, 
          message: 'Produit ajouté au panier',
          cartItemCount: 1 
        });
      })
    );
  }

  /**
   * Toggle le statut favori d'un produit
   * TODO Backend: Implémenter l'endpoint POST /api/products/{id}/favorite
   * Response attendue: { success: boolean, isFavorite: boolean }
   * Note: Le backend doit gérer l'état des favoris par utilisateur (session ou JWT)
   */
  toggleFavorite(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/favorite`, {}).pipe(
      catchError(() => {
        console.log(`[DEV] Toggle favori - Produit ${productId}`);
        return of({ success: true, isFavorite: true });
      })
    );
  }

  /**
   * Récupère les favoris de l'utilisateur
   * TODO Backend: Implémenter l'endpoint GET /api/products/favorites
   * Note: Nécessite l'authentification utilisateur
   */
  getFavorites(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/favorites`).pipe(
      catchError(() => {
        const favorites = this.staticProducts.filter(p => p.isFavorite);
        return of(favorites);
      })
    );
  }

  /**
   * Données statiques pour le développement (sans délai)
   */
  private staticProducts: Product[] = [
    {
      id: 1,
      title: 'LEGO Creator Expert La Tour Eiffel',
      description: 'Construisez la célèbre Tour Eiffel avec ce set détaillé de 10307 pièces',
      price: 629.99,
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop',
      category: 'Architecture',
      stock: 15,
      isNew: true,
      isPromo: false,
      isFavorite: false
    },
    {
      id: 2,
      title: 'LEGO Star Wars Millennium Falcon',
      description: 'Le vaisseau iconique avec 7541 pièces et figurines incluses',
      price: 849.99,
      image: 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?w=400&h=400&fit=crop',
      category: 'Star Wars',
      stock: 8,
      isNew: false,
      isPromo: true,
      isFavorite: true
    },
    {
      id: 3,
      title: 'LEGO Technic Bugatti Chiron',
      description: 'Reproduction fidèle de la supercar avec système de transmission fonctionnel',
      price: 379.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      category: 'Technic',
      stock: 22,
      isNew: false,
      isPromo: false,
      isFavorite: false
    },
    {
      id: 4,
      title: 'LEGO Harry Potter Château de Poudlard',
      description: 'Le château magique complet avec 6020 pièces et de nombreuses salles',
      price: 469.99,
      image: 'https://th.bing.com/th/id/R.3cf682288d8b05d74ec46abcb03b4c68?rik=hvx6n5Z6sogASw&pid=ImgRaw&r=0',
      category: 'Harry Potter',
      stock: 12,
      isNew: true,
      isPromo: true,
      isFavorite: false
    },
    {
      id: 5,
      title: 'LEGO Ideas Piano à Queue',
      description: 'Piano fonctionnel avec mécanisme de touches automatique',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop',
      category: 'Ideas',
      stock: 18,
      isNew: false,
      isPromo: false,
      isFavorite: true
    },
    {
      id: 6,
      title: 'LEGO Architecture Colisée',
      description: 'Réplique authentique du Colisée romain avec 9036 pièces',
      price: 549.99,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=400&fit=crop',
      category: 'Architecture',
      stock: 0,
      isNew: false,
      isPromo: false,
      isFavorite: false
    },
    {
      id: 7,
      title: 'LEGO City Station Spatiale Lunaire',
      description: 'Station spatiale modulaire avec modules scientifiques',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop',
      category: 'City',
      stock: 45,
      isNew: true,
      isPromo: false,
      isFavorite: false
    },
    {
      id: 8,
      title: 'LEGO Ninjago Temple Dragon',
      description: 'Temple asiatique avec dragon articulé et 6 figurines ninja',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
      category: 'Ninjago',
      stock: 28,
      isNew: false,
      isPromo: true,
      isFavorite: false
    }
  ];

  /**
   * Applique filtres, tri et pagination sur les données statiques
   */
  private getStaticProducts(
    page: number,
    size: number,
    search?: string,
    sortBy?: string,
    filter?: string
  ): ProductResponse {
    let products = [...this.staticProducts];

    // Filtrage par recherche
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtrage par catégorie/type
    if (filter) {
      switch (filter) {
        case 'new':
          products = products.filter(p => p.isNew);
          break;
        case 'popular':
          products = products.filter(p => p.id <= 5);
          break;
        case 'promo':
          products = products.filter(p => p.isPromo);
          break;
        case 'stock':
          products = products.filter(p => (p.stock || 0) > 0);
          break;
      }
    }

    // Tri
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          products.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'date':
          products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
      }
    }

    // Pagination
    const totalElements = products.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const paginatedProducts = products.slice(startIndex, startIndex + size);

    return {
      content: paginatedProducts,
      totalPages: totalPages,
      totalElements: totalElements,
      currentPage: page,
      pageSize: size
    };
  }
}