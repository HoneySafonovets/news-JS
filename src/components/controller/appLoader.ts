import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const testUrl: string = process.env.API_URL || ' ';
        const testKey: string = process.env.API_KEY || ' ';

        super(testUrl, {
            apiKey: testKey,
        });
    }
}

export default AppLoader;
