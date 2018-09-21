import {Component, OnInit, AfterViewInit, Injector} from '@angular/core'
import {BaseComponent} from '../../common/base.component'
import {Router} from '@angular/router'
import {youTubeService, CacheManager} from '../../services/services'
import {VideoItem, Language} from '../../../../../shared/models'
import {Actions} from "../../../store/actions/actions";
import {LOAD_VIDs} from "../../../store/const";


declare var youmax: any;

@Component({
  templateUrl: './videos.html',

  styleUrls: ['./videos.scss']

})

export class Videos extends BaseComponent implements OnInit, AfterViewInit {
  youmaxObj: any;
  ImageURL: string;

  constructor(public router: Router
    , private injector: Injector
    , private yts: youTubeService
    , private cacheManager: CacheManager
    , public actions: Actions) {
    super(injector);
    this.videos = new Array<VideoItem>();
  }

  ngAfterViewInit() {
    //var options = {
    //    apiKey: "AIzaSyCveFKo8nQBAsJtrTyotXVx2wxqg5rHDBY",
    //    clientId: "32210824715-6kkbgjdro3468agc4e66erp7llv3kf8n.apps.googleusercontent.com",
    //    channel: "https://www.youtube.com/user/noyaschleien",
    //    youtube_channel_uploads: [
    //        {
    //            name: "",
    //            url: "https://www.youtube.com/user/noyaschleien",
    //            selected: true
    //        },
    //    ],

    //    autoPlayVideo: true,
    //    displayFirstVideoOnLoad: true,
    //    autoLoadComments: true,
    //    hideNavigation: true,
    //    hideLoadMore: true,
    //    hideHeader: true
    //};

    //this.youmaxObj = new youmax(options);


  }

  videos: Array<VideoItem>;

  ngOnInit() {
    this.actions.dispatcAction({actiontype:LOAD_VIDs})
    let cachedLang = this.cacheManager.GetFromCache('lang', Language.Hebrew);
    let lang = cachedLang == Language.English ? 'en' : 'he';
    this.yts.fetchVideos().subscribe(i =>
      (<Array<any>>i).forEach(j => {

        this.videos.push({title: j['snippet']['title'], videoId: j['snippet']['resourceId']['videoId'], lang: lang})

      }
      )
    )
  }
}
