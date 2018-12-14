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

  async callme(el: HTMLInputElement) {
    const nums: string[] = el.value.split(/[\s,]+/).filter(n => n !== '');
    await this.pubEventFunc(nums);
    el.value = '';
  }
}
