import { animate, style, transition, trigger } from '@angular/animations';

export const pathAnimations = trigger('pathAnimations', [
  transition(':enter', [style({ 'stroke-dashoffset': '122' }), animate(500, style({ 'stroke-dashoffset': '0' }))]),
]);
