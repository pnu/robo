import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService, Document } from '../storage.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styles: []
})
export class CallComponent implements OnInit {
  @Input() doc: Document;

  call$: Observable<{}>;
  transcriptions$: Observable<Document[]>;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.call$ = this.storage.data$(this.doc);
    this.transcriptions$ = this.storage.docs$('Transcription', this.doc);
  }
}
