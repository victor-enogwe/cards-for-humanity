import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string, type?: 'html' | 'iframe' | 'script' | 'javascript' | 'css'): SafeUrl {
    switch (true) {
      case type === 'html':
        return this.domSanitizer.bypassSecurityTrustHtml(value);
      case type === 'script':
      case type === 'iframe':
        return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
      case type === 'javascript':
        return this.domSanitizer.bypassSecurityTrustScript(value);
      case type === 'css':
        return this.domSanitizer.bypassSecurityTrustStyle(value);
      default:
        return this.domSanitizer.bypassSecurityTrustUrl(value);
    }
  }
}
