import { Injectable } from '@angular/core';

@Injectable()

export class GeneratePassword {

  constructor() {

  }

  encriptarPassword( str ) {
   return window.btoa(unescape(encodeURIComponent( str )));
 }

 desencriptarPasword( str ) {
   return decodeURIComponent(escape(window.atob( str )));
 }


}
