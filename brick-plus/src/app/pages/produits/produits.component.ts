import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product, ProductResponse, ProduitsService } from './produits.service';

// Enregistre les données de localisation française
registerLocaleData(localeFr);

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }], // Configure la locale
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
})
export class Produits implements OnInit {
  Math = Math;

  searchTerm: string = '';
  sortBy: string = '';
  filterBy: string = '';
  
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 8;
  totalProducts: number = 0;

  products: Product[] = [];
  isLoading: boolean = true; // Commence en mode loading
  errorMessage: string = '';

  // Subject pour debounce la recherche
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private produitsService: ProduitsService
  ) {
    // Configuration du debounce pour la recherche (attend 300ms après la dernière saisie)
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.currentPage = 1;
        this.loadProducts();
      });
  }

  ngOnInit(): void {
    console.log('🔄 Initialisation du composant produits');
    this.loadProducts();
  }

  /**
   * Charge les produits depuis le backend
   * En cas d'erreur, utilise automatiquement les données statiques du service
   */
  loadProducts(): void {
    console.log('📦 Chargement des produits...');
    this.isLoading = true;
    this.errorMessage = '';

    // Angular utilise des pages basées sur 0
    const pageIndex = this.currentPage - 1;

    this.produitsService
      .getProducts(pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.filterBy)
      .subscribe({
        next: (response: ProductResponse) => {
          console.log('Réponse reçue:', response);
          this.products = response.content;
          this.totalPages = response.totalPages;
          this.totalProducts = response.totalElements;
          this.isLoading = false;
          
          console.log(` ${this.totalProducts} produits chargés (page ${this.currentPage}/${this.totalPages})`);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des produits:', error);
          this.errorMessage = 'Impossible de charger les produits';
          this.isLoading = false;
        },
        complete: () => {
          console.log('Chargement terminé');
          this.isLoading = false;
        }
      });
  }

  /**
   * Gestion de la recherche avec debounce
   */
  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  /**
   * Gestion du tri
   */
  onSort(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  /**
   * Gestion du filtrage
   */
  onFilter(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  /**
   * Ajoute un produit au panier
   * TODO Backend: Une fois l'API prête, le service gérera automatiquement l'appel
   * Le backend devra retourner le nouveau compteur du panier
   */
  addToCart(product: Product): void {
    this.produitsService.addToCart(product.id).subscribe({
      next: (response) => {
        console.log('Produit ajouté au panier:', product.title);
        
        // TODO: Une fois le backend prêt, mettre à jour le compteur du panier dans le header
        // Exemple: this.headerService.updateCartCount(response.cartItemCount);
        
        // Notification temporaire (à remplacer par un toast/snackbar)
        this.showNotification(` ${product.title} ajouté au panier !`);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout au panier:', error);
        this.showNotification(`Erreur lors de l'ajout au panier`);
      }
    });
  }

  /**
   * Toggle le statut favori d'un produit
   * TODO Backend: Le backend doit gérer l'état des favoris par utilisateur
   * Nécessite une authentification (session ou JWT)
   */
  toggleFavorite(product: Product, event: Event): void {
    event.stopPropagation();
    
    this.produitsService.toggleFavorite(product.id).subscribe({
      next: (response) => {
        // Met à jour l'état local
        product.isFavorite = !product.isFavorite;
        
        const message = product.isFavorite 
          ? ` ${product.title} ajouté aux favoris`
          : ` ${product.title} retiré des favoris`;
        
        console.log(message);
      },
      error: (error) => {
        console.error(' Erreur lors de la mise à jour du favori:', error);
      }
    });
  }

  /**
   * Navigation entre les pages
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  /**
   * Génère les numéros de page pour la pagination
   */
  getPageNumbers(): number[] {
    const maxPagesToShow = 5;
    
    if (this.totalPages <= maxPagesToShow) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  /**
   * Navigation vers la page d'accueil
   */
  goBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Affiche une notification (temporaire - à remplacer par un système de toast)
   */
  private showNotification(message: string): void {
    // TODO: Implémenter un vrai système de notifications (Angular Material Snackbar, etc.)
    alert(message);
  }
}