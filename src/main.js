import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import i18n from './i18n'
import VueMask from 'v-mask'
import BootstrapVue from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import CoreUiVue from "@coreui/vue"
import { iconsSet as icons } from "./assets/icons/icons.js"
import { ValidationProvider, ValidationObserver, configure, extend } from 'vee-validate'
import { loadVeeValidateExtend } from "./plugins/vee-validate"
import * as rules from "vee-validate/dist/rules"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(VCalendar, {
  componentPrefix: "vc"
})
configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`);
    console.log(values._field_);

    if (field === "password_confirm") {
      values.target = i18n.t(`fields.target.${field}`);
    }

    return i18n.t(`validation.${values._rule_}`, values);
  }
});
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

loadVeeValidateExtend()
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(CoreUiVue)
Vue.use(BootstrapVue)
Vue.use(VueMask)
// Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  router,
  store,
  icons,
  i18n,
  render: h => h(App),
}).$mount('#app')
