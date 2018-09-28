


export interface Box {
  title: string;
  text: string
}

export interface TraverseItem {
  Text?: string;
  Description?: string;

  Title?: string;
  ID?: number;
  Image_Url?: string;
}

export interface HomePageText {
  Text?: string;
  ID?: number;
  TimeStamp?: Date;
}

export interface HomePageTextResponse extends DataResponse {
  items: HomePageText[];
}


export interface VideoItem {
  title: string;
  videoId: string;
  lang: string;
}

export enum ResourceType {
  Html, Url
}


export enum Mode { Store, Noya }

export enum Language {
  Hebrew, English
}

export enum SqlLanguage {
  Heb, Eng
}

export interface DataRequest {
  Language: Language;
}


export interface UpdatesRsponse extends DataResponse {
  items: Update[];
}

export interface ImageGalleryRequest extends DataRequest {
  CurrentImageID: number;
  NextData: NextData;
  DataAmount: DataAmount;
}

export enum DataAmount {
  All, Single
}

export interface ImageGalleryItem {
  ID: number;
  ImagePath?: string
  ImageURL?: string
  ImageID?: string
  Visible?: boolean
  Order?: number;
  Selected?: boolean;
}


export interface ImageGalleryResponse extends DataResponse {
  items: ImageGalleryItem[];
  Image: ImageGalleryItem;
}

export interface PressResponse extends DataResponse {
  items: PressItem[];
}

export interface TraverseItemResponse extends DataResponse {
  items: TraverseItem[];
}


export interface PressItem {
  ID: number;
  Text: string;
  TimeStamp: Date;

}


export interface Update {

  ID: number;
  Text: string;
  Order: number;
  TimeStamp: Date;
}

export interface CalendarRequest extends DataRequest {
  //Direction: string;
  //Month: number;
  //Year: number;
  CurrentCalendarDate: Date;
  NextData: NextData;

}

export interface Program {
  ID?: number;
  Name?: string;
  Text?: string;
  TimeStamp?: Date;
  Order?: number;
}


export interface CalendarItem {
  Text: string;
  Visible: boolean;
  TimeStamp: Date;
  DataDate: Date;
  ID: number;
}

export interface CV {
  ID?: number;
  Text?: string;
  TimeStamp?: Date;
}

export enum NextData {
  Next, Prev, Currnet
}

export interface CalendarResponse extends DataResponse {
  items: CalendarItem;
}

export interface CVResponse extends DataResponse {
  items: CV[];
}

export interface ProgramResponse extends DataResponse {
  items: Program[];
}

export interface DataResponse {
  items;
}

export interface MenuResponse extends DataResponse {
  //public MenuItem] MenuItems { get; set; }
  MenuItems: MenuItem[];
}

export interface MessageResponse extends DataResponse {
}


export interface LinksResponse extends DataResponse {
  items: Link[];
}

// export interface Person {
//   Name: string;
//   Email: string;
// }

export interface MessageRequest extends DataRequest {
  Message: Message;
}

export interface Message {
  Date: Date;
  Content: string;
  Sender: { Name: string, Email: string; };
  IP: string;
}

export interface Link {
  ID?: number;
  Text_Heb?: string;
  Text?: string;
  Address_Heb?: string;
  Address?: string;
  Text_Eng?: string;
  Address_Eng?: string;
  Order?: number
  TimeStamp?: Date;
}

export interface MenuImageResponse extends DataResponse {
  ImageURL: string;

}

export interface MenuImageRequest extends DataRequest {
  PathName: string;
}

export interface MenuItem {
  ID: number;
  Order: number;
  Text_English: string;
  Text_Hebrew: string;
  isDefault: boolean;
  Name: string;
  ImageID: number;
  ImageURL: string;

}

export interface DataError {
  ErrorCode: number;
  ErrorText: string;
}

export interface proc_param {
  name: string;
  type: any;
  value: string | number
}

export interface proc_arg {
  name:{value:string}
}




