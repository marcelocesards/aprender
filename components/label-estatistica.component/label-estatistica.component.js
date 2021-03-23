import { BaseComponent } from "../base.component/base.component.js";
const baseComponent = new BaseComponent();

export class LabelEstatisticaComponent {
    async render(container) {
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/label-estatistica.component/label-estatistica.component.html",
        });
        return this.element;
    }
}

