import {Injectable, ComponentFactoryResolver, Inject, ReflectiveInjector} from '@angular/core';
import {EtapeComponent} from '../etape/etape.component'

@Injectable({
  providedIn: 'root'
})
export class DynamicService {

  rootViewContainer: any;

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent() {
    console.log('DynamicComponent')
    const factory = this.factoryResolver
                        .resolveComponentFactory(EtapeComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }
}
