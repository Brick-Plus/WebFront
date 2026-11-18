import { Component, computed, signal } from '@angular/core';

type Category = 'sets' | 'figurines' | 'accessoires';
type SortOrder = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

interface PlaceholderProduct {
  id: number;
  title: string;
  description: string;
  category: Category;
}

const categories: Category[] = ['sets', 'figurines', 'accessoires'];

@Component({
  selector: 'app-catalogue',
  standalone: true,
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {
  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal<Category | 'all'>('all');
  protected readonly sortOrder = signal<SortOrder>('newest');
  protected readonly currentPage = signal(1);
  protected readonly pageSize = 8;
  protected readonly favoriteIds = signal<number[]>([]);
  protected readonly cartIds = signal<number[]>([]);

  protected readonly products: PlaceholderProduct[] = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    title: 'Titre',
    description: 'Description',
    category: categories[index % categories.length]
  }));

  protected readonly filteredProducts = computed(() => {
    const query = this.searchTerm().trim().toLocaleLowerCase();
    const category = this.selectedCategory();
    const results = this.products.filter((product) => {
      const matchesSearch =
        !query ||
        `${product.title} ${product.description} article provisoire ${product.id}`
          .toLocaleLowerCase()
          .includes(query);
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });

    return results.sort((first, second) => {
      switch (this.sortOrder()) {
        case 'oldest':
          return first.id - second.id;
        case 'title-asc':
          return first.title.localeCompare(second.title) || first.id - second.id;
        case 'title-desc':
          return second.title.localeCompare(first.title) || first.id - second.id;
        default:
          return second.id - first.id;
      }
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

  protected updateCategory(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      const selectedCategory =
        target.value === 'all'
          ? 'all'
          : categories.find((category) => category === target.value);
      if (selectedCategory) {
        this.selectedCategory.set(selectedCategory);
        this.currentPage.set(1);
      }
    }
  }

  protected updateSort(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      const sortOrder = target.value;
      if (
        sortOrder === 'newest' ||
        sortOrder === 'oldest' ||
        sortOrder === 'title-asc' ||
        sortOrder === 'title-desc'
      ) {
        this.sortOrder.set(sortOrder);
        this.currentPage.set(1);
      }
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