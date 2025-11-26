import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
}


@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
})
export class Produits {
  searchTerm: string = '';
  sortBy: string = '';
  filterBy: string = '';
  
  currentPage: number = 1;
  totalPages: number = 5;


  products: Product[] = [
    {
      id: 1,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    },
    {
      id: 2,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    },
    {
      id: 3,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    },
    {
      id: 4,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    },
    {
      id: 5,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    },
    {
      id: 6,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    },
    {
      id: 7,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    },
    {
      id: 8,
      title: 'Titre du produit',
      price: 'Prix',
      image: 'assets/images/lego.jpg'
    }
  ];

  constructor(private router: Router) {}

  onSearch(): void {
    console.log('Recherche:', this.searchTerm);
    // TODO: Appel API backend pour la recherche
  }

  onSort(): void {
    console.log('Trier par:', this.sortBy);
    // TODO: Appel API backend pour le tri
  }

  onFilter(): void {
    console.log('Filtrer par:', this.filterBy);
    // TODO: Appel API backend pour le filtrage
  }

  addToCart(product: Product): void {
    console.log('Ajouter au panier:', product);
    // TODO: Appel API backend pour ajouter au panier
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      console.log('Page:', page);
      // TODO: Appel API backend pour charger les produits de la page
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // TODO: Appel API backend
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // TODO: Appel API backend
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}