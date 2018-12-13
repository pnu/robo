import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService, Document } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  events$: Observable<Document[]>;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.events$ = this.storage.docs$('Event');
  }
}
