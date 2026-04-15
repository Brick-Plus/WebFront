import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product, ProduitsService } from '../produits/produits.service';
import { AvisComponent } from "../../components/avis/avis.component";

@Component({
  selector: 'app-set-complet',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, ProductCardComponent, AvisComponent],
  templateUrl: './set-complet.component.html',
  styleUrl: './set-complet.component.scss'
})
export class SetCompletComponent implements OnInit {
  newProduct: Product | null = null;
  usedProduct: Product | null = null;
  polybagProduct: Product | null = null;

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.produitsService.getProducts(0, 1, {}).subscribe(response => {
      this.newProduct = response.content[0] ?? null;
    });

    this.produitsService.getProducts(1, 1, {}).subscribe(response => {
      this.usedProduct = response.content[0] ?? null;
    });

    this.produitsService.getProducts(2, 1, {}).subscribe(response => {
      this.polybagProduct = response.content[0] ?? null;
    });
  }

  toggleFavorite(productId: number, list: 'new' | 'used' | 'polybag'): void {
    const product = this.getProduct(list);
    if (!product) return;
    this.produitsService.toggleFavorite(product.id).subscribe(() => {
      product.isFavorite = !product.isFavorite;
    });
  }

  addToCart(productId: number, list: 'new' | 'used' | 'polybag'): void {
    const product = this.getProduct(list);
    if (!product) return;
    this.produitsService.addToCart(product.id).subscribe(() => {
      alert(`${product.title} ajouté au panier !`);
    });
  }

  private getProduct(list: 'new' | 'used' | 'polybag'): Product | null {
    if (list === 'new') return this.newProduct;
    if (list === 'used') return this.usedProduct;
    return this.polybagProduct;
  }
}
