import { ISourcesContent } from '../view/appView';

type DataProperties = Record<string, string>;

export enum ResponseCode {
    NotFound = 404,
    Unauthorized = 401,
}

export enum HttpMethod {
    Get = 'GET',
}

export enum Status {
    ok = 'ok',
    error = 'error',
}

interface ILoader {
    endpoint: string;
    options?: DataProperties;
}

export interface ISources {
    status: Status;
    sources: ISourcesContent[];
}

type Callback<T> = (data: T) => void;

class Loader {
    private baseLink: string;

    private options?: DataProperties;

    constructor(baseLink: string, options: DataProperties) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: ILoader,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === ResponseCode.Unauthorized || res.status === ResponseCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: DataProperties, endpoint: string) {
        const urlOptions: DataProperties = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: Callback<T>, options: DataProperties) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
