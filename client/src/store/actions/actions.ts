import {TraverseItem} from "../../../../shared/models";
import {FluxStandardAction, FSA} from "flux-standard-action";
import {Injectable} from "@angular/core";
import {dispatch} from "@angular-redux/store";
import {CARDS_LOADED, LOAD_CARDS} from "../const";

export type Payload = any;

export interface MetaData {
  actiontype: string;
  url?: string
};

// export type HomeAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class Actions {
  @dispatch()
  dispatcAction = (meta: MetaData, payload?: Payload): FSA<Payload, MetaData> => {
    return {
      type: meta.actiontype,
      meta: meta,
      payload: payload,
    }
  };
  @dispatch()
  doAction = (meta: MetaData, payload?: Payload): FSA<Payload, MetaData> => ({
    type: meta.actiontype,
    meta: meta,
    payload: payload,
  })
}

