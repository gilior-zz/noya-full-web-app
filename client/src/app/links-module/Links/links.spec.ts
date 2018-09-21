import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Links} from "./links";
import {Actions} from "../../../store/actions/actions";
import {NgRedux} from "@angular-redux/store";
import {of} from "rxjs/index";
import {Link} from "../../../../../shared/models";
import {By} from "@angular/platform-browser";
import {LinkComponent} from "../link/link.component";

describe('links test:', () => {
  let fixture: ComponentFixture<Links>;
  let links: Link[] = [
    {Text_Eng: 'a'},
    {Text_Eng: 'b'},
    {Text_Eng: 'c'},
    {Text_Eng: 'd'},
  ]
  let mockNgRedux = jasmine.createSpyObj(['select'])
  beforeEach(() => {
    mockNgRedux.select.and.returnValue(of(links))
    TestBed.configureTestingModule({
      declarations: [Links,LinkComponent],
      providers: [Actions,
        {provide: NgRedux, useValue: mockNgRedux}]
    })
    fixture = TestBed.createComponent(Links)
    fixture.detectChanges();
  })
  it('should set correct number of ny-link (5)', () => {
    let linkComponents = fixture.debugElement.queryAll(By.directive(LinkComponent));
    let l = linkComponents.length;
    expect(l).toEqual(4);

  })
})
