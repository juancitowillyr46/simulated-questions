import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './presentation/about/about.component';
import { ContactComponent } from './presentation/contact/contact.component';
import { CourseComponent } from './presentation/course/course.component';
import { FaqComponent } from './presentation/faq/faq.component';
import { HomeComponent } from './presentation/home/home.component';
import { ShopCartComponent } from './presentation/shop-cart/shop-cart.component';
import { ShopCheckoutComponent } from './presentation/shop-checkout/shop-checkout.component';
import { IsFooterGuard } from './shared/guards/is-footer.guard';


const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [IsFooterGuard]
  // },
  {
    path: 'course/:key',
    component: CourseComponent,
    canActivate: [IsFooterGuard]
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [IsFooterGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [IsFooterGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [IsFooterGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'shop-cart',
    component: ShopCartComponent,
    canActivate: [IsFooterGuard]
  },
  {
    path: 'shop-checkout',
    component: ShopCheckoutComponent,
    canActivate: [IsFooterGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
