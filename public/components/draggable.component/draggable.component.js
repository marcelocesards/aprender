import { BaseComponent } from "../base.component/base.component.js";
const baseComponent = new BaseComponent();

export class DraggableComponent {
    constructor({interact,text}){
        this.interact = interact;
        this.text = text;
    }
    async render(container) {
        this.element = await baseComponent.renderTemplate({
            container,
            templatePath: "/components/draggable.component/draggable.component.html",
        });
        
        this.element.innerHTML = this.text;
        this.element.setAttribute('key',this.text);
        return this.element;
    }
    async setDraggables(){
        this.interact('.draggable').draggable({
            listeners: {
                move (event) {
                    const target = event.target;
                    target.classList.remove("valid");
                    target.classList.remove("invalid");
                    target.classList.add("neutral");

                    const dataX = target.getAttribute('data-x');
                    const dataY = target.getAttribute('data-y');
                    const initialX = parseFloat(dataX) || 0;
                    const initialY = parseFloat(dataY) || 0;

                    const deltaX = event.dx;
                    const deltaY = event.dy;

                    const newX = initialX + deltaX;
                    const newY = initialY + deltaY;

                    target.style.transform = `translate(${newX}px, ${newY}px)`;
                    target.setAttribute('data-x', newX);
                    target.setAttribute('data-y', newY);
                }
            }
        })
    }
}

