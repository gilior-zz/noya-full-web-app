import {CV} from "../../../../../shared/models";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BiographyComponent} from "./biography.component";
import {By} from "@angular/platform-browser";

describe('biography.component (child)', () => {
  let cv: CV = {Text: 'some text'}
  let fixture: ComponentFixture<BiographyComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiographyComponent]
    })
    fixture = TestBed.createComponent(BiographyComponent);
    fixture.componentInstance.cv = cv;
    fixture.detectChanges();
  })
  it(`should display correct text of biography.component (${cv.Text})`, () => {
    let l = fixture.nativeElement.querySelector('div');
    let ll = l.textContent;
    expect(ll).toEqual(cv.Text)
  })
})
