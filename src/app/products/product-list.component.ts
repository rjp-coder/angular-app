import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component ({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    errorMessage: any;

    constructor(private productService: ProductService) {

    }
    pageTitle: string = 'Product List:';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string = '';
    public get listFilter(): string {
      return this._listFilter;
    }
    public set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts= this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts : IProduct[];
    products: IProduct[] = null;

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe({
        next: products => {this.products = products;this.filteredProducts = products},
        error: err => this.errorMessage = err,
      });
      this.filteredProducts = this.products;
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List ' + message;
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct )=> 
          product.productName.toLocaleLowerCase().indexOf(filterBy) !==-1);
    }
}