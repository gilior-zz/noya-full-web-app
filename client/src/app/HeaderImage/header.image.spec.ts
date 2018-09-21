import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderImage} from './header.image';
import {LangBarComponent} from '../LangBar/lang-bar.component';
import {MenuComponent} from '../Menu/menu';
import {PPipe} from '../pipes/pipes.pipe';
import {RouterTestingModule} from '@angular/router/testing';

import {UtiltyService} from '../services/utitlity';
import {CacheManager, TranslationService} from '../services/services';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {SafeResourcePipe} from '../pipes/safe.pipe';
import {PageNameService} from '../services/page-name.service';

describe('header.image', () => {
  let fixture: ComponentFixture<HeaderImage>
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [HeaderImage, LangBarComponent, PPipe, MenuComponent],
      providers: [PageNameService, UtiltyService, CacheManager, TranslationService]
    })
    fixture = TestBed.createComponent(HeaderImage);
    fixture.detectChanges();
  })

  it(' should minimize img  (after 2 seconds)', () => {
    setTimeout(() => {

    }, 2000)
    fixture.componentInstance.setCurrentStyles(false);
    fixture.detectChanges();
    let div = fixture.nativeElement.querySelector('.header') as HTMLDivElement;
    let height = div.clientHeight;
    expect(height).toEqual(200);
  }, 2000)

  it('should minimize img after menu click ( (after 2 seconds)', () => {
    setTimeout(() => {
      let menuComponent = fixture.debugElement.query(By.directive(MenuComponent));
      let componentInstance = menuComponent.componentInstance as MenuComponent;
      componentInstance.changeCollpse();
      fixture.detectChanges();
      let htmlDivElement = fixture.nativeElement.querySelector('.header') as HTMLDivElement;
      let clientHeight = htmlDivElement.clientHeight;
      expect(clientHeight).toEqual(200);
    }, 2000)

  })

})
