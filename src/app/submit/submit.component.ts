import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styles: [`.container > * { width: 100%; }`]
})
export class SubmitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  callme(el: HTMLInputElement) {
    const nums: string[] = el.value.split(/[\s,]+/).filter(n => n !== '');
    el.value = '';
    console.log(nums);
  }
}
