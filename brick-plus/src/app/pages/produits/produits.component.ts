import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { SearchFilterBarComponent, SearchFilterEvent } from "../../components/search-filter-bar/search-filter-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { Product, ProductResponse, ProduitsService } from './produits.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchFilterBarComponent, FooterComponent, ProductCardComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
})
export class Produits implements OnInit {
  // Données
  products: Product[] = [];
  totalProducts: number = 0;

  // État de chargement
  isLoading: boolean = false;
  errorMessage: string = '';

  // Pagination
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 12;

  // Filtres
  filters = {
    search: '',
    sort: '',
    category: ''
  };

  constructor(
    private router: Router,
    private produitsService: ProduitsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Charge les produits (API ou données statiques)
   */
  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.produitsService
      .getProducts(this.currentPage - 1, this.pageSize, this.filters)
      .subscribe({
        next: (response: ProductResponse) => {
          this.products = response.content;
          this.totalPages = response.totalPages;
          this.totalProducts = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.errorMessage = 'Impossible de charger les produits';
          this.isLoading = false;
        }
      });
  }

  /**
   * Gestion des changements de filtres
   */
  onFiltersChange(event: SearchFilterEvent): void {
    this.filters = {
      search: event.searchTerm,
      sort: event.sortBy,
      category: event.filterBy
    };
    this.currentPage = 1;
    this.loadProducts();
  }

  /**
   * Ajouter au panier
   */
  addToCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    this.produitsService.addToCart(product.id).subscribe({
      next: () => {
        alert(`${product.title} ajouté au panier !`);
      },
      error: () => {
        alert(`Erreur lors de l'ajout au panier`);
      }
    });
  }

  /**
   * Toggle favori
   */
  toggleFavorite(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    this.produitsService.toggleFavorite(product.id).subscribe({
      next: () => {
        product.isFavorite = !product.isFavorite;
      }
    });
  }

  /**
   * Navigation pagination
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
