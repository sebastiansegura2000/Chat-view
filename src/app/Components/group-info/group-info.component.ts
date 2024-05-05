import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  confirmDelete(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este grupo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar el grupo
        Swal.fire(
          '¡Grupo eliminado!',
          'El grupo ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  }

  updateGroup(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres actualizar este grupo?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica de actualización del grupo aquí
        Swal.fire(
          '¡Grupo actualizado!',
          'El grupo ha sido actualizado correctamente.',
          'success'
        );
        // Cierra el modal
        const modal = document.getElementById('createGroupModal');
        if (modal) {
          modal.dispatchEvent(new Event('hide.bs.modal'));
        }
      }
    });
  }
}
