import { ShopCartItemDto } from '../model/shop-cart-item.dto';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShopCartRepository {
    
    private items: ShopCartItemDto[] = [];
    private itemsData = new BehaviorSubject<ShopCartItemDto[]>([]);
    public currentItemsData = this.itemsData.asObservable();

    addItem(item: ShopCartItemDto): Observable<boolean> {
        const that = this;
        return new Observable((execute) => {
            let find = that.items.find(f => f.productId == item.productId);
            if(find){
                execute.next(false);
            } else {
                that.items.push(item);
                that.itemsData.next(that.items);
                execute.next(true);
            }
        });
    }

    editItem(id: string, itemDto: ShopCartItemDto) {
        const that = this;
        that.items.forEach((item, index) => {
            if(item.productId === id){
                that.items[index] = itemDto;
            }
        });
        that.itemsData.next(that.items);
    }

    findItem(id: string): ShopCartItemDto {
        const that = this;
        let find = that.items.find(f => f.productId == id);
        return find;
    }

    removeItem(id: string) {
        const that = this;
        let findIndex = that.items.findIndex(f => f.productId == id);
        that.items.splice(1, findIndex);
        that.itemsData.next(that.items);
    }

    findAllItem(): Observable<ShopCartItemDto[]> {
        const that = this;
        return that.currentItemsData;
    }
}