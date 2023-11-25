import { ProductStatus } from "../enums/ProductStatus";
import { Category } from "./Category";
import { Photo } from "./Photo";
import { ProductInfo } from "./ProductInfo";
import { ProductDiscount } from "./ProductDiscount";
import { ProductExpert } from "./ProductExpert";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    taxRate: number;
    createdAt: Date;
    modificationDate: Date;
    status: ProductStatus;
    productInfo: ProductInfo;
    photo: Photo;
    category: Category;
    productExpert: ProductExpert;
    productDiscounts: ProductDiscount[];
}

export class ProductFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    price?: number | null = null;
    taxRate: number = 23;
    categoryId: number = 1;
    productExpertId: number = 1;
    status: ProductStatus = ProductStatus.Available;
    currentStock: number = 50;

    constructor(product?: ProductFormValues) {
        if (product) {
            this.id = product.id;
            this.name = product.name;
            this.description = product.description;
            this.price = product.price;
            this.taxRate = product.taxRate;
            this.categoryId = product.categoryId;
            this.productExpertId = product.productExpertId;
            this.status = product.status;
            this.currentStock = product.currentStock;
        }
    }
}