import { Component,HostListener } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';


  // private secuenciaTeclas: string[] = ['w', 'a', 's', 'd'];
  // private indiceSecuencia = 0;


  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   const teclaPresionada = event.key.toLowerCase();

  //   if (teclaPresionada === this.secuenciaTeclas[this.indiceSecuencia]) {
  //     this.indiceSecuencia++;

  //     if (this.indiceSecuencia === this.secuenciaTeclas.length) {
  //       console.log('xd');
  //       // window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  //       // window.close();
  //       // window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  //       // const nombre = window.prompt('Por favor, ingresa tu nombre', 'Nombre');
  //       // alert(nombre);
  //       this.indiceSecuencia = 0;
  //     }
  //   } else {
  //     this.indiceSecuencia = 0;
  //   }
  // }


}
