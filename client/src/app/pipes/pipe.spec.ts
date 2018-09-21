import {PPipe} from "./pipes.pipe";
import {SafeResourcePipe} from "./safe.pipe";
import {SafeResourceUrl} from "@angular/platform-browser";
import {ResourceType} from "../../../../shared/models";

describe('pipes.pipe', () => {
  let p, mockTranslationService, safePipe,mockDomSanitizer;
  beforeEach(() => {
    mockTranslationService = jasmine.createSpyObj(['TranlateItem'])
    mockDomSanitizer = jasmine.createSpyObj(['bypassSecurityTrustHtml','bypassSecurityTrustResourceUrl'])
    p = new PPipe(mockTranslationService)
    safePipe=new SafeResourcePipe(mockDomSanitizer)
  })

  it('translate correctly', () => {
    mockTranslationService.TranlateItem.and.returnValue('שלום')
    let transform = p.transform('hello')
    expect(transform).toBe('שלום')
  })

  it('dom sanitize correctly', () => {
    mockDomSanitizer.bypassSecurityTrustHtml.and.returnValue('abc')
    let  transform= safePipe.transform('abc',ResourceType.Html);

    console.log(transform)
    expect(transform).toBe('abc')
  })
})
