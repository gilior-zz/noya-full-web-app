import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MenuComponent} from './menu';
import {CacheManager, TranslationService} from '../services/services';
import {PageNameService} from '../services/page-name.service';
import {Router} from '@angular/router';
import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {By} from '@angular/platform-browser';
import {PPipe} from '../pipes/pipes.pipe';

@Directive({
  selector: '[routerLink]'
})
export class MockRouterLink {
  @Input('routerLink') linkParams: string;
  navigaeTo: string

  @HostListener('click')
  onClick() {
    this.navigaeTo = this.linkParams;
  }
}

@Directive({
  selector: '[routerLinkActive]'
})
export class MockRouterLinkActive implements OnInit {
  @Input('routerLinkActive') activeClass: string

  ngOnInit(): void {
    console.log('activeClass', this.activeClass);
  }
}

describe('menu test:', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let spyObj = jasmine.createSpyObj(['navigate']);
  let mockRouter = {...spyObj, routerState: {snapshot: {url: ''}}}
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent, MockRouterLink, MockRouterLinkActive, PPipe],
      providers: [CacheManager, PageNameService, TranslationService,
        {provide: Router, useValue: mockRouter}]
    })
    fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
  })

  it('should change collapse status when clicking button (after 1 seconds)', () => {
    let button = fixture.debugElement.query(By.css('button'));

    setTimeout(() => {
      button.triggerEventHandler('click', null);
      fixture.detectChanges();
      let isCollapsed = fixture.componentInstance.isCollapsed;

      expect(isCollapsed).toEqual(false)
    }, 1000)
  })

  it('should update navigaeTo on anchor click (afer 1 second)', () => {
    setTimeout(() => {
      let a = fixture.debugElement.query(By.css('a'));
      a.triggerEventHandler('click', null);
      fixture.detectChanges();
      let mockRouterLink = fixture.debugElement.query(By.directive(MockRouterLink));
      let mockRouterLinkDirective = mockRouterLink.injector.get(MockRouterLink);
      let navigaeTo = mockRouterLinkDirective.navigaeTo;
      expect(navigaeTo).toEqual('home')
    }, 1000)


  })
})
