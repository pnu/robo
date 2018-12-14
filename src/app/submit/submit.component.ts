import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styles: [`.container > * { width: 100%; }`]
})
export class SubmitComponent implements OnInit {
  private pubEventFunc: (data: any) => Observable<any>;

  constructor(func: AngularFireFunctions) {
    this.pubEventFunc = func.httpsCallable('pubEvent');
  }

  ngOnInit() {
  }

  async callme(numsEl: HTMLInputElement, mesgEl: HTMLInputElement) {
    const nums: string[] = numsEl.value.split(/[\s,]+/).filter(n => n !== '');
    await this.pubEventFunc([nums, mesgEl.value]);
    numsEl.value = ''; mesgEl.value = '';
  }
}
