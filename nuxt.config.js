//const pkg = require('.package');
//const bodyParser = require('body-parser');

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'my_app_nuxt2',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/index.js',
        '@/plugins/internal.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxtjs/pwa',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        '@nuxtjs/auth-next',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://localhost:3001/api/',
    },
    /*
 ** Auth module configuration
 */
    /*auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    // required: true,
                    // type: 'Bearer'
                },
                user: {
                    property: 'user',
                    // autoFetch: true
                },
                endpoints: {
                    login: {
                        url: '/login',
                        method: 'post'
                    },
                    logout: {
                        url: '/logout',
                        method: 'post'
                    },
                    //user: {url: '/api/auth/user', method: 'get'}
                }
            }
        }
    },*/

    /*auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'access_token',
                    maxAge: 1800,
                    global: true,
                    // type: 'Bearer'
                },
                refreshToken: {
                    property: 'refresh_token',
                    data: 'refresh_token',
                    maxAge: 60 * 60 * 24 * 30
                },
                user: {
                    property: 'user',
                    // autoFetch: true
                },
                endpoints: {
                    login: {
                        url: '/login',
                        method: 'post'
                    },
                    refresh: {
                        url: '/refresh',
                        method: 'post'
                    },
                    user: {
                        url: '/user',
                        method: 'get'
                    },
                    logout: {
                        url: '/logout',
                        method: 'post'
                    }
                },
                // autoLogout: false
            }
        }
    },*/

    /*auth: {
        strategies: {
            local: {
                token: {
                    property: 'accessToken',
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: false, // <--- Default "user"
                    autoFetch: true
                },
                endpoints: {
                    login: { url: '/login', method: 'post' },
                    logout: { url: '/logout', method: 'post' },
                    user: { url: '/user', method: 'get' }
                }
            }
        }
    },*/

    /*auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/login',
                        method: 'post',
                        propertyName: 'accessToken'
                    },
                    logout: {
                        url: '/logout',
                        method: 'post'
                    },
                    user: {
                        url: '/auth/me',
                        method: 'post',
                        propertyName: false
                    },
                    tokenRequired: true
                }
            }
        }
    },*/

    // this is
    auth: {
        /*redirect: {
            login: '/login',
            logout: '/logout',
            home: '/'
        },*/
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "/login",
                        method: "post",
                        propertyName: "data.token",
                    },
                    logout: false,
                    user: false,
                },
                tokenType: '',
                tokenName: 'x-auth',
                autoFetchUser: false
            },
        },
    },

    /*
        auth: {
            strategies: {
                local: {
                    endpoints: {
                        login: {
                            url: 'login',
                            method: 'post',
                            propertyName: 'data.data.data.accessToken',
                        },
                        user: {
                            url: 'me',
                            method: 'get',
                            propertyName: 'data'
                        },
                        logout: false
                    }
                }
            }
        },
    */

    /*auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: 'login',
                        method: 'post',
                        propertyName: 'data.data.accessToken'
                    },
                    user: { url: 'me', method: 'get', propertyName: 'data' },
                    logout: false
                }
            }
        }
    },*/

    /*auth: {
        strategies: {
            customStrategy: {
                scheme: '~/schemes/customScheme',
                /!* ... *!/
            }
        }
    },*/

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        // please set your icon app
        icon: false,
        manifest: {
            name: 'My Awesome App',
            lang: 'fa',
            useWebmanifestExtension: false
        }
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    /*
    router middleware log
     */
    router: {
        //extendRoutes(routes, resolve) {},
        //middleware: ['auth']
    },

    serverMiddleware: [
        /*bodyParser.json(),
        '~/api'*/
    ],

    generate: {
        /*routes: function() {
          axios.get('');
          return [

          ]
        }*/
    },

    loading: {
        continuous: true
    },

    /*env: {
      baseUrl: process.env.BASE_URL || 'http://localhost:8000/api/'
    }*/
}
