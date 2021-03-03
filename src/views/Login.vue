<template>
  <div>
    <h1>{{ $t("page_title.page_login") }}</h1>
    <ValidationProvider name="birthday" rules="required" v-slot="{ errors }">
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input type="text" v-mask="'####-##-##'" v-model="form.birthday"></b-form-input>
      </b-input-group>
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
    <ValidationProvider name="username" rules="min:2|max:10" v-slot="{ errors }">
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input type="text" v-model="form.username"></b-form-input>
      </b-input-group>
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
    <div class="d-flex date-pk">
      <vc-date-picker v-model="form.date" mode="date">
        <template v-slot="{ inputValue, togglePopover }">
          <!-- <input
            class="px-2 py-1"
            :value="inputValue"
          /> -->
          <ValidationProvider v-slot="{ errors }" :rules="rules" :name="name">
            <imask-input
              :mask="Date"
              :pattern="'d/`m/`Y'"
              :format="formatDate"
              :parse="parse"
              :blocks="blocks"
              :lazy="false"
              :overwrite="true"
              :autofix="true"
              v-model="dataDate"
              for="date-picker"
              :value="inputValue"
            >
            </imask-input>
            <span class="required">{{ errors[0] }}</span>
          </ValidationProvider>
          <button
            class="p-2"
            @click="togglePopover({ placement: 'right-start', visibility: 'click' })"
          >
            <CIcon name="cil-calendar" style="width: 100%; height: 100%"/>
          </button>
        </template>
      </vc-date-picker>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { IMaskComponent } from "vue-imask";
// import IMask from "imask";

export default {
  name: 'Login',
  components: {
    "imask-input": IMaskComponent,
    ValidationProvider
  },
  data: () => ({
    form: {
      birthday: '',
      username: '',
      date: new Date(2020, 0, 1)
    }
  })
}
</script>

<style>
.date-pk {
  height: 35px;
}
.date-pk input {
  padding: 10px;
  border: 1px solid #d8dbe0;
  border-radius: 0.25rem;
}
.date-pk button {
  height: 35px;
  line-height: 10px;
}
</style>