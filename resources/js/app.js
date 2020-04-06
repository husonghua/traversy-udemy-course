/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

import Traversy1 from './components/Traversy1.vue'
import Traversy2 from './components/Traversy2.vue'
import Traversy3 from './components/Traversy3.vue'
import Traversy4 from './components/Traversy4.vue'
import Traversy5 from './components/Traversy5.vue'
import Traversy6 from './components/Traversy6.vue'
import Traversy7 from './components/Traversy7.vue'
import Traversy8 from './components/Traversy8.vue'
import Traversy9 from './components/Traversy9.vue'
import Traversy10 from './components/Traversy10.vue'
import Traversy11 from './components/Traversy11.vue'
import Traversy12 from './components/Traversy12.vue'
import Traversy13 from './components/Traversy13.vue'
import Traversy14 from './components/Traversy14.vue'
import Traversy15 from './components/Traversy15.vue'
import Traversy16 from './components/Traversy16.vue'
import Traversy17 from './components/Traversy17.vue'
import Traversy18 from './components/Traversy18.vue'
import Traversy19 from './components/Traversy19.vue'
import Traversy20 from './components/Traversy20.vue'

import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    faCoffee,
    faChild,
    faCircle,
    faArchive,
    faTimes,
    faBars,
    faTimesCircle,
    faSearch,
    faRandom,
    faPlay,
    faStop,
    faPause,
    faCog
} from '@fortawesome/free-solid-svg-icons'
import {
    faComment
} from '@fortawesome/free-regular-svg-icons'
import {
    faTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(
    faRandom,
    faSearch,
    faTimesCircle,
    faBars,
    faTimes,
    faCoffee,
    faChild,
    faCircle,
    faArchive,
    faComment,
    faTwitter,
    faPlay,
    faStop,
    faPause,
    faCog
)

Vue.component('font-awesome-icon', FontAwesomeIcon)


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components: {
        'traversy-1': Traversy1,
        'traversy-2': Traversy2,
        'traversy-3': Traversy3,
        'traversy-4': Traversy4,
        'traversy-5': Traversy5,
        'traversy-6': Traversy6,
        'traversy-7': Traversy7,
        'traversy-8': Traversy8,
        'traversy-9': Traversy9,
        'traversy-10': Traversy10,
        'traversy-11': Traversy11,
        'traversy-12': Traversy12,
        'traversy-13': Traversy13,
        'traversy-14': Traversy14,
        'traversy-15': Traversy15,
        'traversy-16': Traversy16,
        'traversy-17': Traversy17,
        'traversy-18': Traversy18,
        'traversy-19': Traversy19,
        'traversy-20': Traversy20,

    }
});
