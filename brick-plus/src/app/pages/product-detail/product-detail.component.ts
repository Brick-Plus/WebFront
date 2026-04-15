import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product, ProduitsService } from '../produits/produits.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  recommendedProducts: Product[] = [];
  quantity = 1;
  selectedState: string = 'neuf-scelle';
  activeTab: string = 'description';
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitsService: ProduitsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.produitsService.getProducts(0, 100, {}).subscribe(response => {
      this.product = response.content.find(p => p.id === id) || null;
      this.mainImage = this.product?.image || '';
      // Produits recommandés = les 3 autres
      this.recommendedProducts = response.content
        .filter(p => p.id !== id)
        .slice(0, 3);
    });
  }

  changeQuantity(delta: number): void {
    this.quantity = Math.max(1, this.quantity + delta);
  }

  addToCart(): void {
    if (this.product) {
      this.produitsService.addToCart(this.product.id).subscribe(() => {
        alert(`${this.product!.title} ajouté au panier !`);
      });
    }
  }

  toggleFavorite(productId: number): void {
    const p = this.recommendedProducts.find(p => p.id === productId);
    if (p) p.isFavorite = !p.isFavorite;
  }

  goBack(): void {
    this.router.navigate(['/catalogue']);
  }
}