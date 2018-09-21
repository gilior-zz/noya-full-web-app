import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LinkComponent} from "./link.component";

describe('link.component test:', () => {
  let fixture: ComponentFixture<LinkComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkComponent]
    })
    fixture = TestBed.createComponent(LinkComponent);
  })
  it('should display correct add', () => {
    fixture.componentInstance.link = {Text_Eng: 'some text'}
    fixture.detectChanges();
    let htmlAnchorElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    let textContent = htmlAnchorElement.textContent;
    expect(textContent).toEqual('some text');
  })
})
