<script setup>
defineProps({
    value: {
        type: String,
        required: true,
    },
    buttonClass: {
        type: String,
        default: 'bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md w-full font-bold uppercase cursor-pointer mt-5',
    }
  
  
});
</script>
<template>
  <input
    type="submit"
    :value="value"
    :class="buttonClass"
  />
</template>

<style lang="scss" scoped></style>
