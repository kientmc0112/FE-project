import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import Vue from "vue";
import vi from "vee-validate/dist/locale/vi";
import en from "vee-validate/dist/locale/en";
import ja from "vee-validate/dist/locale/ja";

Vue.use(VueI18n);

function loadLocaleMessages() {
  const l = { vi: vi, en: en, ja: ja };
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = Object.assign({}, locales(key), {
        validation: l[locale].messages
      });
    }
  });
  return messages;
}

const i18n = new VueI18n({
  locale: Cookies.get("ecs_user_locale") || "vi",
  fallbackLocale: "vi",
  messages: loadLocaleMessages()
});

export default i18n;