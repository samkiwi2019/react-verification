import axios from 'axios';
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.queue = {};
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {},
            withCredentials: false,
        };
        return config;
    }
    destroy(url) {
        delete this.queue[url];
    }
    interceptors(instance, url) {
        instance.interceptors.request.use(
            config => {
                if (!Object.keys(this.queue).length) {
                    // do something before sending requests
                }
                this.queue[url] = true;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        instance.interceptors.response.use(
            res => {
                this.destroy(url);
                const { data, status } = res;
                // do something after getting responses
                return { data, status };
            },
            error => {
                this.destroy(url);
                return Promise.reject(error.response);
            }
        );
    }
    request(options) {
        const instance = axios.create();
        const mergeOptions = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, mergeOptions.url);
        return instance(mergeOptions);
    }
}
export default HttpRequest;
