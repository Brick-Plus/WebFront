import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchFilterBarComponent, SearchFilterEvent } from '../../components/search-filter-bar/search-filter-bar.component';
import { Product, ProductResponse, ProduitsService } from '../produits/produits.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductCardComponent, SearchFilterBarComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];
  totalProducts = 0;
  isLoading = false;
  errorMessage = '';
  currentPage = 1;
  totalPages = 1;
  pageSize = 12;

  filters = { search: '', sort: '', category: '' };

  constructor(
    private router: Router,
    private produitsService: ProduitsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.produitsService.getProducts(this.currentPage - 1, this.pageSize, this.filters)
      .subscribe({
        next: (response: ProductResponse) => {
          this.products = response.content;
          this.totalPages = response.totalPages;
          this.totalProducts = response.totalElements;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Impossible de charger les produits';
          this.isLoading = false;
        }
      });
  }

  onFiltersChange(event: SearchFilterEvent): void {
    this.filters = {
      search: event.searchTerm,
      sort: event.sortBy,
      category: event.filterBy
    };
    this.currentPage = 1;
    this.loadProducts();
  }

  addToCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    this.produitsService.addToCart(product.id).subscribe({
      next: () => alert(`${product.title} ajouté au panier !`)
    });
  }

  toggleFavorite(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    this.produitsService.toggleFavorite(product.id).subscribe({
      next: () => { product.isFavorite = !product.isFavorite; }
    });
  }

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
    if (end - start < maxPages - 1) start = Math.max(1, end - maxPages + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  navigateToProduct(productId: number): void {
  this.router.navigate(['/product', productId]);
}
}