import { animate, animateChild, query, sequence, style, transition, trigger } from '@angular/animations';

export const navigationAnimations = trigger('navigationAnimations', [
  transition('* <=> *', [
    style({ position: 'relative', transform: 'translateY(10px)' }),
    query(':enter, :leave', [style({ position: 'fixed', width: '100%', opacity: 0 }), animateChild()], { optional: true }),
    sequence([
      query(':leave', [animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' }))], { optional: true }),
      query(':enter', [animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))], { optional: true }),
    ]),
  ]),
]);
