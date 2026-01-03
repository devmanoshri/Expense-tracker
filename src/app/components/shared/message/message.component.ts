import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Message, MessageService } from './message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit, OnDestroy {
  showMessage = true;
  private readonly messageService = inject(MessageService);
  message = {} as Message;
  subscription = new Subscription();
  timeoutId: number | null = null;

  ngOnInit(): void {
    this.subscription.add(
      this.messageService.messsage$.subscribe((message) => {
        this.message = message;
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        this.timeoutId = window.setTimeout(() => {
          this.clearMessage();
        }, 15000);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearMessage(): void {
    this.messageService.reset();
  }
}
