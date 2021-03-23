export class BaseComponent {
    async importTemplate({templatePath}){
        let template = await fetch(templatePath);
        return await template.text();
    }
    async renderTemplate({container, templatePath}){
        let template = await this.importTemplate({templatePath});
        let templateDom = this.parse(template);
        container.append(templateDom);
        return templateDom;
    }       
    parse(templateText){
        let templateDom = new DOMParser().parseFromString(templateText, 'text/html');
        return templateDom.querySelector('body').firstChild;
    }
}