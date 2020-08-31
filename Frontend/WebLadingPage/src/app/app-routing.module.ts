import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './presentation/about/about.component';
import { ContactComponent } from './presentation/contact/contact.component';
import { CourseComponent } from './presentation/course/course.component';
import { FaqComponent } from './presentation/faq/faq.component';
import { HomeComponent } from './presentation/home/home.component';
import { ShopCarComponent } from './presentation/shop-car/shop-car.component';
import { ShopCheckoutComponent } from './presentation/shop-checkout/shop-checkout.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'course/:key',
    component: CourseComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'shop-car',
    component: ShopCarComponent
  },
  {
    path: 'shop-checkout',
    component: ShopCheckoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
