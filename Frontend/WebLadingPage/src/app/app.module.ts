import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './presentation/home/home.component';
import { CourseComponent } from './presentation/course/course.component';
import { FaqComponent } from './presentation/faq/faq.component';
import { AboutComponent } from './presentation/about/about.component';
import { ContactComponent } from './presentation/contact/contact.component';
import { ShopCarComponent } from './presentation/shop-car/shop-car.component';
import { ShopCheckoutComponent } from './presentation/shop-checkout/shop-checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    FaqComponent,
    AboutComponent,
    ContactComponent,
    ShopCarComponent,
    ShopCheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
