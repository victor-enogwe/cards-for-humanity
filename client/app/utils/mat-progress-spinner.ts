import { MatProgressSpinnerDefaultOptions, ProgressSpinnerMode } from '@angular/material/progress-spinner';

export class MatProgressSpinnerOptions implements MatProgressSpinnerDefaultOptions {
  color?: string;
  mode?: ProgressSpinnerMode;
  diameter?: number;
  strokeWidth?: number;
  loaderClass?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _forceAnimations?: boolean;
  value?: number;
}
