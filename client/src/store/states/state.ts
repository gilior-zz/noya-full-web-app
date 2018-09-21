import {CV, ImageGalleryItem, Link, Program, TraverseItem, VideoItem} from '../../app/dal/models';


export interface IAppState {
  homePageText: string;
  videos: { [key: number]: VideoItem };
  images: { [key: number]: ImageGalleryItem };
  links: { [key: number]: Link };
  biographies: { [key: number]: CV };
  programs: { [key: number]: Program };
  cards: { [key: number]: TraverseItem };
  msg_snt: boolean;
}

export const initState: IAppState = {
  homePageText: '',
  videos: [],
  images: [],
  links: [],
  biographies: [],
  programs: [],
  cards: [],
  msg_snt: false
}
