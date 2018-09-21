import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CacheManager} from '../services/services';
import {Language, MessageRequest} from '../../../../shared/models';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Actions} from '../../store/actions/actions';
import {SND_MSG} from '../../store/const';
import {NgRedux} from '@angular-redux/store';
import {Observable} from 'rxjs/Rx';
import {NavigationEnd, Router} from '@angular/router';
import {IAppState} from '../../store/states/state';

@Component({
  selector: 'contact-widget',
  styleUrls: ['contact-widget.scss'],
  templateUrl: 'contact-widget.html',
  animations: [
    trigger('onContactVisibleChanged', [
      state('1', style({height: '*'})),
      state('0', style({height: '40px'})),
      transition('1 <=> 0', [
        animate(250)
      ])
    ])
  ]
})
export class ContactWidget implements OnInit {
  contactVisible = false;
  msg_snt$: Observable<{}>;
  public contactWidgetForm: FormGroup;
  public showWidget = true;

  constructor(private formBuilder: FormBuilder,
              private cacheManager: CacheManager,
              public actions: Actions, private router: Router,
              public store: NgRedux<IAppState>) {
    this.buildForm();
  }

  public get arrowUpDown(): string {
    return this.contactVisible ? 'down' : 'up';
  }

  public get btnStyle() {
    return {
      'background-color': this.contactWidgetForm.valid ? '#00b3ee' : 'grey',
      'opacity': this.contactWidgetForm.valid ? 1 : 0.5,
      'transform': this.contactWidgetForm.valid ? 'scaleX(1)' : 'scaleX(0.8)'
    }
  }

  public get arrowLeftRight(): string {
    const language = this.cacheManager.Language;
    const res = Number(language) === Language.English ? 'right' : 'left';
    return res;
  }

  get message(): string {
    return this.contactWidgetForm.get('message').value
  }

  get dir(): string {
    let l = this.cacheManager.GetFromCache('lang', Language.Hebrew);
    if (l == Language.Hebrew) return 'rtl'
    else return 'ltr'
  }

  ngOnInit(): void {
    const obs = this.store.select('msg_snt');
    obs
      .subscribe(() => {
        this.contactWidgetForm.reset({
          email: ['noyaschleien@gmail.com'],
          phone: ['054-4-715-150'],
        });
      })

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showWidget = !event.url.toLowerCase().includes('contact')
        }
      });
    this.showWidget = !this.router.url.toLowerCase().includes('contact')
  }

  public onSubmit() {

    var req: MessageRequest = {
      Language: Language.Hebrew,
      Message: {
        Sender: {Name: 'send-box', Email: 'send-box'},
        IP: '',
        Date: new Date(),
        Content: this.message
      }
    };


    this.actions.dispatcAction({actiontype: SND_MSG, url: 'SendMessage'}, req);
    this.contactVisible = false;
  }

  onClick(){
    this.contactVisible=!this.contactVisible
  }

  private buildForm() {
    this.contactWidgetForm = this.formBuilder.group({
      email: ['noyaschleien@gmail.com'],
      phone: ['054-4-715-150'],
      message: ['', Validators.required]
    })
  }
}
