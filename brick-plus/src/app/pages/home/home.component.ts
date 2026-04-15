import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product, ProduitsService } from '../produits/produits.service';
import { AvisComponent } from "../../components/avis/avis.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, FooterComponent, CommonModule, ProductCardComponent, AvisComponent]
})
export class HomeComponent implements OnInit {
  newProducts: Product[] = [];

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.produitsService.getProducts(0, 3, {}).subscribe(response => {
      this.newProducts = response.content;
    });
  }

  toggleFavorite(productId: number): void {
    const product = this.newProducts.find(p => p.id === productId);
    if (!product) return;
    this.produitsService.toggleFavorite(product.id).subscribe(() => {
      product.isFavorite = !product.isFavorite;
    });
  }

  addToCart(productId: number): void {
    const product = this.newProducts.find(p => p.id === productId);
    if (!product) return;
    this.produitsService.addToCart(product.id).subscribe(() => {
      alert(`${product.title} ajouté au panier !`);
    });
  }
}
