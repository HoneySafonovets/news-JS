import './sources.css';

export interface ISource {
    id: string;
    name: string;
}

class Sources {
    draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: ISource) => {
            const sourceClone = sourceItemTemp && (sourceItemTemp.content.cloneNode(true) as DocumentFragment);

            const sourceItemName: HTMLElement | null = sourceClone && sourceClone.querySelector('.source__item-name');
            const sourceItem: HTMLElement | null = sourceClone && sourceClone.querySelector('.source__item');

            if (sourceItemName) {
                sourceItemName.textContent = item.name;
            }

            if (item.id && sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }
            if (sourceClone) {
                fragment.append(sourceClone);
            }
        });

        const source: HTMLElement | null = document.querySelector('.sources');

        if (source) {
            source.append(fragment);
        }
    }
}

export default Sources;
