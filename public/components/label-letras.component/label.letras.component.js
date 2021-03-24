import { BaseComponent } from "../base.component/base.component.js";
const baseComponent = new BaseComponent();

export class LabelLetrasComponent {
    async render(container) {
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/label-letras.component/label.letras.component.html",
        });
        return this.element;
    }
}

