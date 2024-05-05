import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/Interfaces/User/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateGroupFormService {

  constructor() {}

  getGroupName(form: FormGroup): string {
    return form.get('groupName').value;
  }

  getSelectedParticipantsIds(form: FormGroup, participants: User[]): number[] {
    return form.value.participants
      .map((checked, index) => (checked ? participants[index].id : null))
      .filter((v) => v != null);
  }
}
