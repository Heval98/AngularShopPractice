import { Component } from '@angular/core';

import { OnExit } from 'src/app/guardians/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnExit {
  onExit() {
    const rta = confirm('Componente, seguro que deseas salir?');
    return rta;
  }
}
