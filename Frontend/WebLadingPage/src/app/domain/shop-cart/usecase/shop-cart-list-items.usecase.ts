import { ShopCartItemDto } from '../model/shop-cart-item.dto';
import { Injectable } from '@angular/core';
import { ShopCartRepository } from '../repository/shop-cart.repository';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShopCartListItemsUseCase {

    constructor(private shopCartRepository: ShopCartRepository) {

    }

    public execute(): Observable<ShopCartItemDto[]> {
        const that = this;
        return that.shopCartRepository.findAllItem();
    }
}