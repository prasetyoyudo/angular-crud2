import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService<T> {
  private componentRef: ComponentRef<T> | undefined;

  selectedDate: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) { }

  async open(component: Type<T>): Promise<void> {
    if (this.componentRef) {
      return;
    }
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory<T>(component)
      .create(this.injector);
    this.applicationRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  setSelectedDate(date: string) {
    this.selectedDate.next(date)
  }

  getSelectedDate(): Observable<string> {
    return this.selectedDate.asObservable()
  }

  async close(): Promise<void> {
    if (!this.componentRef) {
      return;
    }

    this.applicationRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();

    this.componentRef = undefined;
  }
}
