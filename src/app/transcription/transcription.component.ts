import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService, Document } from '../storage.service';

@Component({
  selector: 'app-transcription',
  templateUrl: './transcription.component.html',
  styles: []
})
export class TranscriptionComponent implements OnInit {
  @Input() doc: Document;

  transcription$: Observable<{}>;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.transcription$ = this.storage.data$(this.doc);
  }
}
