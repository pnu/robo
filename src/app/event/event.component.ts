import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService, Document } from '../storage.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: []
})
export class EventComponent implements OnInit {
  @Input() doc: Document;

  event$: Observable<{}>;
  calls$: Observable<Document[]>;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.event$ = this.storage.data$(this.doc);
    this.calls$ = this.storage.docs$('Call', this.doc);
  }
}
