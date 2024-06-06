<template>
  <label>
    <select class="custom-input" @change="$emit('updateSelection', $event.target.value)">
      <option
        v-for="option in options"
        :value="option.value"
        :selected="defaultOption == option.value"
        :key="option.value"
      >
        {{ option.name }}
      </option>
    </select>
    {{ label }}
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    options: {
      type: Array,
    },
    defaultOption: {
      type: String,
    },
  },
}
</script>

<style scoped>
label {
  display: flex;
  align-items: center;
}

select {
  display: inline-block;
  width: 110px;
  margin-right: 8px;
}
</style>
