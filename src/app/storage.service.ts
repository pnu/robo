import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export type Document = AngularFirestoreDocument;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private db: AngularFirestore) { }

  public docs$(coll: string, doc: Document | AngularFirestore = this.db) {
    return doc.collection(coll).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return new AngularFirestoreDocument(a.payload.doc.ref, this.db);
      }))
    );
  }

  public data$(doc: Document) {
    return doc.valueChanges();
  }
}
