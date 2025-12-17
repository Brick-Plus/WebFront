import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

export interface FilterOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface SearchFilterEvent {
  searchTerm: string;
  sortBy: string;
  filterBy: string;
}

@Component({
  selector: 'app-search-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter-bar.component.html',
  styleUrl: './search-filter-bar.component.scss'
})
export class SearchFilterBarComponent {
  @Input() searchPlaceholder: string = 'Rechercher';
  @Input() sortOptions: SortOption[] = [
    { value: '', label: 'Trier par' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'name', label: 'Nom' },
    { value: 'date', label: 'Date d\'ajout' }
  ];
  @Input() filterOptions: FilterOption[] = [
    { value: '', label: 'Filtrer' },
    { value: 'new', label: 'Nouveautés' },
    { value: 'popular', label: 'Populaires' },
    { value: 'promo', label: 'Promotions' },
    { value: 'stock', label: 'En stock' }
  ];

  // Événements émis vers le parent
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() allFiltersChange = new EventEmitter<SearchFilterEvent>();

  searchTerm: string = '';
  sortBy: string = '';
  filterBy: string = '';

  // Subject pour debounce la recherche
  private searchSubject = new Subject<string>();

  constructor() {
    // Configuration du debounce pour la recherche (300ms)
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.searchChange.emit(searchTerm);
        this.emitAllFilters();
      });
  }

  onSearchInput(value: string): void {
    this.searchSubject.next(value);
  }

  onSortChange(): void {
    this.sortChange.emit(this.sortBy);
    this.emitAllFilters();
  }

  onFilterChange(): void {
    this.filterChange.emit(this.filterBy);
    this.emitAllFilters();
  }

  /**
   * Émet tous les filtres en une seule fois
   */
  private emitAllFilters(): void {
    this.allFiltersChange.emit({
      searchTerm: this.searchTerm,
      sortBy: this.sortBy,
      filterBy: this.filterBy
    });
  }

  /**
   * Réinitialise tous les filtres
   */
  resetFilters(): void {
    this.searchTerm = '';
    this.sortBy = '';
    this.filterBy = '';
    this.emitAllFilters();
  }
}