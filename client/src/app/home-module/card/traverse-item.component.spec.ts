import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TraverseItemComponent} from './traverse-item.component';
import {TraverseItem} from '../../dal/models';
import {SafeResourcePipe} from '../../pipes/safe.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PPipe} from '../../pipes/pipes.pipe';

describe('traverse-item.component', () => {
  let fixture: ComponentFixture<TraverseItemComponent>
  let traverseItem: TraverseItem = {
    Description: 'TraverseItem_Description',
    ID: 123456789,
    Image_Url: 'TraverseItem_Image_Url',
    Text: 'TraverseItem_Text',
    Title: 'TraverseItem_Title',
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [TraverseItemComponent, SafeResourcePipe,PPipe]
    })
    fixture = TestBed.createComponent(TraverseItemComponent);
  })

  xit('should display correct url', () => {
    fixture.componentInstance.traverseItem = traverseItem;
    fixture.detectChanges();
    let img = fixture.nativeElement.querySelector('.item-content--img');
    console.log('img', img)
    let src = img.src;
    expect(src).toEqual(location.origin + '/' + traverseItem.Image_Url);
  })

  xit('should display correct title', () => {
    fixture.componentInstance.traverseItem = traverseItem;
    fixture.detectChanges();
    let div = fixture.nativeElement.querySelector('.item-caption') as HTMLDivElement;
    let innerHTML = div.innerHTML;
    expect(innerHTML).toEqual(traverseItem.Title);
  })


})
