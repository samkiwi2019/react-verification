import axios from 'axios';
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.queue = {};
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`, // passport
            },
            withCredentials: true, // carry cookies
        };
        return config;
    }
    destroy(url) {
        delete this.queue[url];
    }
    interceptors(instance, url) {
        instance.interceptors.request.use(
            (config) => {
                if (!Object.keys(this.queue).length) {
                    // do something before sending requests
                }
                this.queue[url] = true;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        instance.interceptors.response.use(
            (res) => {
                console.log(res);
                this.destroy(url);
                const { data, status } = res;
                // do something after getting responses
                return { data, status };
            },
            (error) => {
                this.destroy(url);
                let errorInfo = error.response;
                //==============  Error exception  ====================
                //==============  Error exception  ====================
                //==============  Error exception  ====================
                if (!errorInfo) {
                    const {
                        request: { statusText, status },
                        config,
                    } = JSON.parse(JSON.stringify(error));
                    errorInfo = {
                        data: { message: statusText },
                        statusText,
                        status,
                        request: { responseURL: config.url },
                    };
                }
                switch (errorInfo.status) {
                    case 400:
                        errorInfo.data.message = 'Request error (400)';
                        break;
                    case 401:
                        errorInfo.data.message =
                            'Unauthorized, please log in again (401)';
                        break;
                    case 403:
                        errorInfo.data.message = 'Access denied (403)';
                        break;
                    case 404:
                        errorInfo.data.message = 'Content not found (404)';
                        break;
                    case 408:
                        errorInfo.data.message = 'Request timeout (408)';
                        break;
                    case 500:
                        errorInfo.data.message = 'Server error (500)';
                        break;
                    case 501:
                        errorInfo.data.message =
                            'Service not implemented (501)';
                        break;
                    case 502:
                        errorInfo.data.message = 'Network error (502)';
                        break;
                    case 503:
                        errorInfo.data.message = 'Service unavailable (503)';
                        break;
                    case 504:
                        errorInfo.data.message = 'Gateway timeout(504)';
                        break;
                    case 505:
                        errorInfo.data.message =
                            'HTTP version is not supported(505)';
                        break;
                    default:
                        errorInfo.data.message = `Connection error(${errorInfo.status})!`;
                }
                return Promise.reject(errorInfo);
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
