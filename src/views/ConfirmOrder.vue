<template>
  <confirm-order-body />
</template>

<script>
// @ is an alias to /src
import ConfirmOrder from "@/components/ConfirmOrder.vue";

export default {
  name: "ConfirmOrder",
  components: {
    "confirm-order-body": ConfirmOrder
  }
};
</script>
