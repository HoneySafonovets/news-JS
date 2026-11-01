import News from './news/news';
import Sources from './sources/sources';

export interface INewsData {
    status: string;
    totalResults: number;
    articles: [];
}

export interface ISourcesContent {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISources {
    sources: ISourcesContent[];
}

export class AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
