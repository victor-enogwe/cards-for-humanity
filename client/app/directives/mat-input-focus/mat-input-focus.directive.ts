import { Directive, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[cfhMatInputFocus]',
})
export class MatInputFocusDirective implements OnInit {
  constructor(private matInput: MatInput) {}

  ngOnInit() {
    setTimeout(() => this.matInput.focus());
  }
}
