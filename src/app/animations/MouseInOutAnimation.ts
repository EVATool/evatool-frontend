import {animate, style, transition, trigger} from '@angular/animations';

export const mouseInOutAnimation =
  trigger(
    'mouseInOutAnimation',
    [
      transition(
        ':enter',
        [
          style({opacity: 0}),
          animate('250ms ease-out',
            style({opacity: 1}))
        ]
      ),
      transition(
        ':leave',
        [
          style({opacity: 1}),
          animate('250ms ease-out',
            style({opacity: 0}))
        ]
      )
    ]
  );
