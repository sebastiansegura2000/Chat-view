import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createGroup(): void {
    Swal.fire({
      title: 'Create Group',
      text: 'Are you sure you want to create this group?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para crear el grupo
        Swal.fire(
          'Group Created!',
          'Your group has been created successfully.',
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
