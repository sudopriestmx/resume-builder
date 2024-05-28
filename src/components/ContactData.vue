<template>
  <ul class="contact">
    <li>
      <font-awesome-icon icon="fa-solid fa-phone" />
      <span contenteditable="true" @blur="$emit('edit', $event, 'contact', 'phone')">
        {{ contact.phone }}
      </span>
    </li>
    <li>
      <font-awesome-icon icon="fa-solid fa-envelope" />
      <span contenteditable="true" @blur="$emit('edit', $event, 'contact', 'email')">
        {{ contact.email }}
      </span>
    </li>
    <li>
      <font-awesome-icon icon="fa-solid fa-house" />
      <span contenteditable="true" @blur="$emit('edit', $event, 'contact', 'address')">
        {{ contact.address }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['contact'],
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
