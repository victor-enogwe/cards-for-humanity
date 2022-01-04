import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

const optional = { optional: true };

export const slideLeft = transition(':decrement', [
  group([
    query('.carousel-item:enter', [style({ perspective: '1000px' })], optional),
    query('@cardAnimation', [animateChild()], optional),
    // query(
    //   ':leave',
    //   [
    //     // style({ perspective: '1000px' }),
    //     stagger(50, [
    //       animate('500ms ease-in', style({ transform: 'rotateY(00deg)' })),
    //       animate('500ms ease-in', style({ transform: 'rotateY(0deg)' })),
    //     ]),
    //   ],
    //   {
    //     optional: true,
    //   },
    // ),
  ]),
]);

export const slideRight = transition(':increment', [
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
]);

export const slideAnimation = trigger('slideAnimation', [slideLeft]);
