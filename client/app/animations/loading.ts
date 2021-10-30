import { animate, style, transition, trigger } from '@angular/animations';

export const loadingAnimations = trigger('loadingAnimations', [
  transition('* => *', [
    style({ border: '1px dashed #000', borderRadius: '50%' }),
    animate('50ms', style({ transform: 'rotate(72deg) scale(1.5)' })),
    animate('50ms', style({ transform: 'rotate(144deg) scale(2)' })),
    animate('50ms', style({ transform: 'rotate(216deg) scale(2.5)' })),
    animate('50ms', style({ transform: 'rotate(288deg) scale(3)' })),
    animate('50ms', style({ transform: 'rotate(360deg) scale(3.5)' })),
    animate('50ms', style({ transform: 'rotate(-72deg) scale(3)' })),
    animate('50ms', style({ transform: 'rotate(-144deg) scale(2.5)' })),
    animate('50ms', style({ transform: 'rotate(-216deg) scale(2)' })),
    animate('50ms', style({ transform: 'rotate(-288deg) scale(1.5)' })),
    animate('50ms', style({ transform: 'rotate(-360deg) scale(1)' })),
  ]),
]);
