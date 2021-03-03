<template>
  <div class="d-flex date-pk">
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
      >
      </imask-input>
      <span class="required">{{ errors[0] }}</span>
    </ValidationProvider>
    <vc-date-picker
      id="date-picker"
      v-model="date"
      mode="date"
      :popover="{ visibility: 'click' }"
    >
      <button @click.prevent="" class="p-2">
        <CIcon name="cil-calendar" />
      </button>
    </vc-date-picker>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { IMaskComponent } from "vue-imask";
import IMask from "imask";
export default {
  name: "DatePickerForm",
  components: {
    "imask-input": IMaskComponent,
    ValidationProvider
  },
  created() {
    this.date = this.parse(this.propsDate);
    this.dataDate = this.propsDate;
  },
  computed: {
    dateChange() {
      if (typeof this.date !== "object" || this.date === null) {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return [day, month, year].join("/");
      }

      let day = this.date.getDate();
      let month = this.date.getMonth() + 1;
      let year = this.date.getFullYear();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;

      return [day, month, year].join("/");
    }
  },
  props: {
    propsDate: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    rules: {
      type: Object,
      default: null
    }
  },
  watch: {
    dateChange: function(e) {
      this.date = this.parse(e);
      this.dataDate = e;
    },
    dataDate: function(value) {
      this.emitData(value);
    },
    propsDate: function(e) {
      this.date = this.parse(e);
      this.dataDate = e;
    }
  },
  data: function() {
    return {
      date: new Date(2020, 11, 31),
      dataDate: "",
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999
        }
      }
    };
  },
  methods: {
    formatDate: function(date) {
      if (typeof date === "string") return new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      return [day, month, year].join("/");
    },
    parse: function(str) {
      if (typeof str === "string") {
        let yearMonthDay = str.split("/");
        return new Date(
          yearMonthDay[2],
          yearMonthDay[1] - 1,
          parseInt(yearMonthDay[0])
        );
      }
    },
    emitData(event) {
      let d = this.isValidDate(event) ? event : "";
      this.$emit("emitDate", d);
    },
    isValidDate(dateData) {
      var pattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
      var m = dateData.match(pattern);
      if (!m) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.date-pk {
  height: 35px;
  span:first-child {
    width: 100%;
  }
  input {
    height: 35px;
    width: 100%;
    padding: 10px;
    border: 1px solid;
    border-color: #d8dbe0;
    border-radius: 0.25rem;
    &:focus {
      color: #768192;
      background-color: #fff;
      border-color: #958bef;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(50, 31, 219, 0.25);
    }
  }
  button {
    height: 35px;
    line-height: 10px;
    &:focus {
      color: #768192;
      background-color: #fff;
      outline: 0;
    }
  }
}
.required {
  color: red;
  white-space: nowrap;
}
</style>
