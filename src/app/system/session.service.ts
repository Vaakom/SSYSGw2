import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";

import {HeartbitService} from "../system/heartbit.service";
import {TableMeta} from "../table/table.meta";

@Injectable()
export class SessionService {

  private userInfoSubject = new BehaviorSubject<Object>(null);
  private sessionOpenSubject = new BehaviorSubject<boolean>(false);
  private tableListSubject = new BehaviorSubject<[TableMeta]>(null);

  private config: Object;

  private globalMessage: string;
  private globalError: string;

  constructor(private heartbitService: HeartbitService) {
  }

  openSession(userInfo: Object): void {
    this.userInfoSubject.next(userInfo);
    this.sessionOpenSubject.next(true);

    this.heartbitService.setHeartbitInterval(this.config['heartbitInterval']);
    this.heartbitService.setSessionId(this.getUserInfo()['s']);
    this.heartbitService.startHeartbit();
  }

  closeSession(): void {
    this.sessionOpenSubject.next(false);
    this.userInfoSubject.next(null);
    this.tableListSubject.next(null);
    this.heartbitService.stopHeartbit();
  }

  isSessionOpen(): boolean {
    return this.sessionOpenSubject.getValue();
  }

  getUserInfo(): Object {
    return this.userInfoSubject.getValue();
  }

  getTableList(): [TableMeta] {
    return this.tableListSubject.getValue();
  }

  setTableList(tableList: [TableMeta]): void {
    return this.tableListSubject.next(tableList);
  }

  getUserInfoSubject(): BehaviorSubject<Object> {
    return this.userInfoSubject;
  }

  getSessionOpenSubject(): BehaviorSubject<Object> {
    return this.sessionOpenSubject;
  }

  getTableListSubject(): BehaviorSubject<[Object]> {
    return this.tableListSubject
  }


  getConfig(): Object {
    return this.config;
  }

  setConfig(value: Object) {
    this.config = value;
  }


  getGlobalMessage(): string {
    return this.globalMessage;
  }

  setGlobalMessage(value: string) {
    this.globalMessage = value;
  }

  getGlobalError(): string {
    return this.globalError;
  }

  setGlobalError(value: string) {
    this.globalError = value;
  }
}
