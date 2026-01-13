import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthStatus } from '../../../../models/authStatus.model';

@Component({
  selector: 'app-auth-status',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
})
export class AuthStatusComponent {
  choiceOptions = [
    { name: 'authorise', icon: 'check-all' },
    { name: 'unauthorise', icon: 'x' },
  ];
  choice = new FormControl<AuthStatus>(this.choiceOptions[1]);

  ngOnInit() {
    const savedStatus = sessionStorage.getItem('authStatus');

    if (savedStatus) {
      const parsedChoice: AuthStatus = JSON.parse(savedStatus);

      const matched = this.choiceOptions.find((option) => option.name === parsedChoice.name);

      if (matched) {
        this.choice.setValue(matched);
      }
    }

    this.choice.valueChanges.subscribe((status) => {
      if (status) {
        sessionStorage.setItem('authStatus', JSON.stringify(status));
      }
    });
  }
}
