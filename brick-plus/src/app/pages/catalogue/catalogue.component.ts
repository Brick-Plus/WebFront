import { Component, computed, signal } from '@angular/core';

type SortCriterion = 'popularity' | 'releaseDate' | 'averageReviews' | 'price';
type FilterCriterion = 'legoType' | 'setCondition' | 'range' | 'subTheme' | 'figureCondition';

interface PlaceholderProduct {
  id: number;
  title: string;
  description: string;
  popularity?: number;
  releaseDate?: string;
  averageReviews?: number;
  price?: number;
  legoType?: string;
  setCondition?: string;
  range?: string;
  subTheme?: string;
  figureCondition?: string;
  available?: boolean;
}

@Component({
  selector: 'app-catalogue',
  standalone: true,
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {
  protected readonly searchTerm = signal('');
  protected readonly sortCriterion = signal<SortCriterion | ''>('');
  protected readonly selectedFilters = signal<Record<FilterCriterion, string>>({
    legoType: '',
    setCondition: '',
    range: '',
    subTheme: '',
    figureCondition: ''
  });
  protected readonly availableOnly = signal(false);
  protected readonly currentPage = signal(1);
  protected readonly pageSize = 8;
  protected readonly favoriteIds = signal<number[]>([]);
  protected readonly cartIds = signal<number[]>([]);

  protected readonly sortCriteria: { key: SortCriterion; label: string }[] = [
    { key: 'popularity', label: 'Popularité' },
    { key: 'releaseDate', label: 'Date de sortie' },
    { key: 'averageReviews', label: 'Avis moyens' },
    { key: 'price', label: 'Prix' }
  ];

  protected readonly filterCriteria: { key: FilterCriterion; label: string }[] = [
    { key: 'legoType', label: 'Type de LEGO' },
    { key: 'setCondition', label: 'État du set' },
    { key: 'range', label: 'Gamme' },
    { key: 'subTheme', label: 'Sous-thème' },
    { key: 'figureCondition', label: 'État de la figurine' }
  ];

  protected readonly products: PlaceholderProduct[] = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    title: 'Titre',
    description: 'Description'
  }));

  protected readonly filteredProducts = computed(() => {
    const query = this.searchTerm().trim().toLocaleLowerCase();
    const sortCriterion = this.sortCriterion();
    const results = this.products.filter((product) => {
      const matchesSearch =
        !query || `${product.title} ${product.description}`.toLocaleLowerCase().includes(query);
      const matchesFilters = this.filterCriteria.every(({ key }) => {
        const selectedValue = this.selectedFilters()[key];
        return !selectedValue || product[key] === selectedValue;
      });
      const matchesAvailability = !this.availableOnly() || product.available === true;
      return matchesSearch && matchesFilters && matchesAvailability;
    });

    if (!sortCriterion) {
      return results;
    }

    return results.sort((first, second) => {
      const firstValue = first[sortCriterion];
      const secondValue = second[sortCriterion];
      if (firstValue === undefined) {
        return secondValue === undefined ? 0 : 1;
      }
      if (secondValue === undefined) {
        return -1;
      }
      if (typeof firstValue === 'number' && typeof secondValue === 'number') {
        return firstValue - secondValue;
      }
      return String(firstValue).localeCompare(String(secondValue));
    });
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize))
  );

  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1)
  );

  protected readonly visibleProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  protected updateSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.searchTerm.set(target.value);
      this.currentPage.set(1);
    }
  }

  protected updateSort(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      const criterion = this.sortCriteria.find((option) => option.key === target.value);
      if (criterion) {
        this.sortCriterion.set(criterion.key);
        this.currentPage.set(1);
      }
    }
  }

  protected filterOptions(criterion: FilterCriterion): string[] {
    return Array.from(
      new Set(
        this.products
          .map((product) => product[criterion])
          .filter((value): value is string => typeof value === 'string' && value.length > 0)
      )
    );
  }

  protected updateFilter(criterion: FilterCriterion, event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      const value = target.value;
      if (!value || this.filterOptions(criterion).includes(value)) {
        this.selectedFilters.update((filters) => ({ ...filters, [criterion]: value }));
        this.currentPage.set(1);
      }
    }
  }

  protected hasAvailabilityData(): boolean {
    return this.products.some((product) => product.available !== undefined);
  }

  protected updateAvailability(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement && this.hasAvailabilityData()) {
      this.availableOnly.set(target.checked);
      this.currentPage.set(1);
    }
  }

  protected setPage(page: number): void {
    this.currentPage.set(Math.min(Math.max(page, 1), this.totalPages()));
  }

  protected isFavorite(productId: number): boolean {
    return this.favoriteIds().includes(productId);
  }

  protected toggleFavorite(productId: number): void {
    this.favoriteIds.update((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]
    );
  }

  protected isInCart(productId: number): boolean {
    return this.cartIds().includes(productId);
  }

  protected toggleCart(productId: number): void {
    this.cartIds.update((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]
    );
  }
}