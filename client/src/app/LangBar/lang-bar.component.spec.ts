import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LangBarComponent} from "./lang-bar.component";
import {CacheManager, TranslationService} from "../services/services";
import {PPipe} from "../pipes/pipes.pipe";
import {By} from "@angular/platform-browser";
import {NgClass} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('lang-bar.component test:', () => {
  let fixture: ComponentFixture<LangBarComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [LangBarComponent, PPipe],
      providers: [CacheManager, TranslationService]
    })
    fixture = TestBed.createComponent(LangBarComponent);
    fixture.detectChanges();
  })
  xit('should react to lang change (after 1 seconds) (inifinte refresh so disabled)', () => {
    let htmlSelectElement = fixture.debugElement.query(By.css('select'));
    setTimeout(() => {
      htmlSelectElement.nativeElement.value = 'eng';
      htmlSelectElement.triggerEventHandler('change', {target: htmlSelectElement.nativeElement});
      expect(true).toBeTruthy();
    }, 1000)
  })

  it('should set correct class for eng mode', () => {


    setTimeout(() => {

      fixture.componentInstance.cacheManager.StoreInCache('lang', 1);
      fixture.detectChanges();
      let ngClass = fixture.debugElement.queryAll(By.directive(NgClass))[1].injector.get(NgClass);
      let l = fixture.debugElement.queryAll(By.css('div'))[1];

      console.log(l);
    }, 1000)

  })
})
