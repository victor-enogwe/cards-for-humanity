import { animate, query, style, transition, trigger } from '@angular/animations';

export const frontToBack = transition('* => void', [
  query('.back:enter', [style({ perspective: '1000px' }), animate('500ms ease-in', style({ transform: 'rotateY(00deg)' }))], {
    optional: true,
  }),
]);

export const backToFront = transition('void => *', []);

export const cardAnimation = trigger('cardAnimation', [frontToBack, backToFront]);
