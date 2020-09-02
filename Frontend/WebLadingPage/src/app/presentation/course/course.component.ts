import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import { ShopCartAddItemUseCase } from 'src/app/domain/shop-cart/usecase/shop-cart-add-item.usecase';
import { ShopCartListItemsUseCase } from 'src/app/domain/shop-cart/usecase/shop-cart-list-items.usecase';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courses = [
    {title: "PROFESSIONAL SCRUM MASTER I", description: '', key: 'PSMI'},
    {title: "AGILE CERTIFIED PRACTITIONER", description: '', key: 'ACP'},
    {title: "PROFESSIONAL AGILE LEADERSHIP", description: '', key: 'PAL'},
    {title: "PROFESSIONAL SCRUM PRODUCT OWNER", description: '', key: 'PSPO'}
  ];

  public course: {title: string, description: string, key: string};
 

  constructor(
    private route: ActivatedRoute,
    private shopCartAddItemUseCase: ShopCartAddItemUseCase,
    private shopCartListItemsUseCase: ShopCartListItemsUseCase  
  ) { }

  ngOnInit(): void {
    const that = this;
    //$('html, body').animate({ scrollTop: 0 }, 100);
    that.route.paramMap.subscribe(params => {
      // console.log(params.get('key'));
      // console.log(params.get('key'));
      if(params.get('key')){
        that.course = that.courses.find(f => f.key == params.get('key'));
      };
    });

    that.shopCartListItem();
  }


  shopCartaddItem() {
    const that = this;
    that.shopCartAddItemUseCase.execute({
      image: 'http://imga.eomc',
      price: 150.00,
      productId: '12345',
      productName: 'Producto',
      quantity: 1,
      subtotal: 150
    }).subscribe(success => {
      if(!success){
        alert('El producto ya se encuentra agregado');
      }
      // console.log(success);
    });
  }

  shopCartListItem() {
    const that = this;
    that.shopCartListItemsUseCase.execute().subscribe( res => {
      console.log(res);
    });
  }

}
