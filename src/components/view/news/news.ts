import './news.css';

export interface IDataSource {
    id: string | null;
    name: string;
}

export interface IDataNews {
    source: IDataSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

class News {
    public draw(data: IDataNews[]): void {
        const news: IDataNews[] = data.length >= 10 ? data.filter((_item: object, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: IDataNews, idx: number): void => {
            const newsClone: DocumentFragment | null =
                newsItemTemp && (newsItemTemp.content.cloneNode(true) as DocumentFragment);

            if (newsClone) {
                if (idx % 2) {
                    newsClone.querySelector('.news__item')?.classList.add('alt');
                }

                const metaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
                const metaAutor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
                const metaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
                const metaDescriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
                const metaDescriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
                const metaDescriptionContent: HTMLElement | null =
                    newsClone.querySelector('.news__description-content');
                const metaMore: HTMLElement | null = newsClone.querySelector('.news__read-more a');

                if (metaPhoto) {
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }
                if (metaAutor) {
                    metaAutor.textContent = item.author || item.source.name;
                }
                if (metaDate) {
                    metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }
                if (metaDescriptionTitle) {
                    metaDescriptionTitle.textContent = item.title;
                }
                if (metaDescriptionSource) {
                    metaDescriptionSource.textContent = item.source.name;
                }
                if (metaDescriptionContent) {
                    metaDescriptionContent.textContent = item.description;
                }
                if (metaMore) {
                    metaMore.setAttribute('href', item.url);
                }
                fragment.append(newsClone);
            }
        });

        const element: HTMLElement | null = document.querySelector('.news');
        if (element) {
            element.innerHTML = '';
        }
        if (element) {
            element.appendChild(fragment);
        }
    }
}

export default News;
