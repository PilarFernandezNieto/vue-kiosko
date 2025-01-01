<script setup>
defineProps({
    value: {
        type: String,
        required: true,
    },
    buttonClass: {
        type: String,
        default: 'bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md w-full font-bold uppercase cursor-pointer mt-5',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
});
</script>
<template>
  <input
    type="submit"
    :value="value"
    :class="[buttonClass, disabled ? 'bg-indigo-300 cursor-not-allowed' : '']"
    :disabled="disabled"
  />
</template>

<style lang="scss" scoped></style>
