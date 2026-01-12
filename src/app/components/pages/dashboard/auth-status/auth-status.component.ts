import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-status',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
})
export class AuthStatusComponent {
  choiceOptions = ['authorise', 'unauthorise'];
  choice = new FormControl('unauthorise');

  ngOnInit() {
    const savedStatus = sessionStorage.getItem('authStatus');
    if (savedStatus) {
      this.choice.setValue(savedStatus);
    }

    this.choice.valueChanges.subscribe((status) => {
      if (status) {
        sessionStorage.setItem('authStatus', status);
        console.log(status);
      }
    });
  }
}
