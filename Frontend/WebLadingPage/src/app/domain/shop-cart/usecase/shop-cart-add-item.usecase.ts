import { ShopCartItemDto } from '../model/shop-cart-item.dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShopCartRepository } from '../repository/shop-cart.repository';

@Injectable({
    providedIn: 'root'
})
export class ShopCartAddItemUseCase {

    constructor(private shopCartRepository: ShopCartRepository) {
        
    }

    public execute(shopCartItemDto: ShopCartItemDto): Observable<boolean> {
        const that = this;
        return that.shopCartRepository.addItem(shopCartItemDto);
    }
}