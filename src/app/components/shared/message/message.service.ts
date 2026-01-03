import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  text: string;
  type: 'info' | 'warning' | 'danger' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  initialValue: Message = {
    text: '',
    type: 'info',
  };
  private _messsage$ = new BehaviorSubject<Message>(this.initialValue);

  reset(): void {
    this._messsage$.next(this.initialValue);
  }

  get messsage$(): Observable<Message> {
    return this._messsage$.asObservable();
  }

  set messsage$(message: Message) {
    this.reset();
    this._messsage$.next(message);
  }
}
