import { Pipe, PipeTransform, OnInit } from '@angular/core'
import { DomSanitizer, SafeUrl, SafeResourceUrl, SafeScript, SafeStyle, SafeHtml } from '@angular/platform-browser';
import * as services from '../services/services'
import * as dal from '../dal/models'
@Pipe({
    name: 'safeResource',

})

export class SafeResourcePipe implements PipeTransform {


    constructor(public sanitizer: DomSanitizer) {

    }
    transform(value: string, resourceType: dal.ResourceType) {
        switch (resourceType) {
            case dal.ResourceType.Html:
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case dal.ResourceType.Url:
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
        }





    }
}
