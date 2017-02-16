import { Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'trustedHtmlPipe'})
export class TrustedHtmlPipe implements PipeTransform {
  
  constructor(private sanitizer : DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}