import News, { IDataNews } from './news/news';
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
    private news: News;

    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<INewsData>) {
        const values: IDataNews[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
