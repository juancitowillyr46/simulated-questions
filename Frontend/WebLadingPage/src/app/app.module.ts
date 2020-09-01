import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './presentation/home/home.component';
import { CourseComponent } from './presentation/course/course.component';
import { FaqComponent } from './presentation/faq/faq.component';
import { AboutComponent } from './presentation/about/about.component';
import { ContactComponent } from './presentation/contact/contact.component';
import { ShopCartComponent } from './presentation/shop-cart/shop-cart.component';
import { ShopCheckoutComponent } from './presentation/shop-checkout/shop-checkout.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IsFooterObsevable } from './shared/observables/is-footer.observable';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    FaqComponent,
    AboutComponent,
    ContactComponent,
    ShopCartComponent,
    ShopCheckoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    IsFooterObsevable
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
