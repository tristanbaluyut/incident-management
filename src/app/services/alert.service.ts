import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _message: string = '';
  private _type: string = '';
  private _visible: boolean = false;
  private _persistOnNextRoute: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof Scroll) {
        if (val.routerEvent instanceof NavigationEnd) {
          if (this._persistOnNextRoute) {
            this._persistOnNextRoute = false;
            console.log('hit persist');
          } else {
            this.setVisible(false);
            console.log('hit not persist');
          }
        }
      }
    });
  }

  getMessage(): string {
    return this._message;
  }

  getType(): string {
    return this._type;
  }

  getVisible(): boolean {
    return this._visible;
  }

  setAlert(message: string, type: string, persistOnNextRoute: boolean) {
    this._message = message;
    this._type = type;
    this._visible = true;
    this._persistOnNextRoute = persistOnNextRoute;
  }

  setVisible(visible: boolean): void {
    this._visible = visible;
  }
}
