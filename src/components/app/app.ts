import AppController from '../controller/controller';
import { AppView, INewsData } from '../view/appView';
import { ISources } from '../controller/loader';

class App {
    private controller: AppController;

    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const container: HTMLElement | null = document.querySelector('.sources');
        if (container) {
            container.addEventListener('click', (e: PointerEvent) =>
                this.controller.getNews(e, (data: INewsData) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data: ISources) => this.view.drawSources(data));
    }
}

export default App;
