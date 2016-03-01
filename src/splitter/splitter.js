import {inject} from 'aurelia-dependency-injection';
import {customAttribute, bindable} from 'aurelia-templating';
import {WidgetBase} from '../common/widget-base';
import {generateBindables} from '../common/decorators';
import {constants} from '../common/constants';
import 'kendo.splitter.min';

@customAttribute(`${constants.attributePrefix}splitter`)
@generateBindables('kendoSplitter')
@inject(Element, WidgetBase)
export class Splitter {

  @bindable options = {};

  constructor(element, widgetBase) {
    this.element = element;
    this.widgetBase = widgetBase
                        .control('kendoSplitter')
                        .linkViewModel(this);
  }

  bind(ctx) {
    this.$parent = ctx;
  }

  attached() {
    this.recreate();
  }

  recreate() {
    this.kWidget = this.widgetBase.createWidget({
      element: this.element,
      parentCtx: this.$parent
    });
  }

  detached() {
    // only destroy if splitter has an Element
    // prevents nested splitters from throwing error on destroy
    // as the parent splitter destroys all child splitters itself
    if (this.kWidget && this.kWidget.element) {
      this.widgetBase.destroy(this.kWidget);
    }
  }
}
