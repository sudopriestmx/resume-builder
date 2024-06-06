<template>
  <ul class="contact">
    <li>
      <font-awesome-icon icon="fa-solid fa-phone" :style="{ color: iconColor }" />
      <span :contenteditable="editing" @blur="$emit('edit', $event, 'contact', 'phone')">
        {{ contact.phone }}
      </span>
    </li>
    <li>
      <font-awesome-icon icon="fa-solid fa-envelope" :style="{ color: iconColor }" />
      <span :contenteditable="editing" @blur="$emit('edit', $event, 'contact', 'email')">
        {{ contact.email }}
      </span>
    </li>
    <li>
      <font-awesome-icon icon="fa-solid fa-house" :style="{ color: iconColor }" />
      <span :contenteditable="editing" @blur="$emit('edit', $event, 'contact', 'address')">
        {{ contact.address }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    contact: {
      type: String,
    },
    editing: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      default: '#ffffff',
    },
  },
}
</script>

<style scoped>
.contact li {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.contact li:last-child {
  margin-bottom: 0;
}

.contact svg {
  display: inline-block;
  margin-right: 10px;
}

.contact span {
  width: 80%;
}

#resume .contact {
  padding-inline-start: 0;
}
</style>
