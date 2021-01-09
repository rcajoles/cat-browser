import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  BootstrapVue,
  IconsPlugin,
  BFormGroup,
  BContainer,
  BRow,
  BCardGroup,
  BCard,
  BButton,
  BFormSelect,
  BFormSelectOption,
} from 'bootstrap-vue'

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// name is optional
Vue.use(VueLodash, { lodash: lodash })

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.component('b-form-group', BFormGroup);
Vue.component('b-container', BContainer);
Vue.component('b-row', BRow);
Vue.component('b-card-group', BCardGroup);
Vue.component('b-card', BCard);
Vue.component('b-button', BButton);
Vue.component('b-form-select', BFormSelect);
Vue.component('b-form-select-option', BFormSelectOption);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
