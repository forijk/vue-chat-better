<template>
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
  >
    <title :id="iconName" lang="en">{{iconName}}</title>
    <path
      d="M924 862a40 40 0 0 1 0-80 20 20 0 0 0 20-20V100a20 20 0 0 0-20-20H262a20 20 0 0 0-20 20 40 40 0 0 1-80 0A100 100 0 0 1 262 0h662a100 100 0 0 1 100 100v662a100 100 0 0 1-100 100z"
      :fill="iconColor"
      p-id="4231"
    />
    <path
      d="M762 1024H100A100 100 0 0 1 0 924V262a100 100 0 0 1 100-100h662a100 100 0 0 1 100 100v662a100 100 0 0 1-100 100zM100 242a20 20 0 0 0-20 20v662a20 20 0 0 0 20 20h662a20 20 0 0 0 20-20V262a20 20 0 0 0-20-20z"
      :fill="iconColor"
      p-id="4232"
    />
    <path
      d="M431 807a40 40 0 0 1-40-40V419a40 40 0 0 1 80 0v348a40 40 0 0 1-40 40z"
      :fill="iconColor"
      p-id="4233"
    />
    <path d="M605 633H257a40 40 0 0 1 0-80h348a40 40 0 0 1 0 80z" :fill="iconColor" p-id="4234" />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "box"
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: "currentColor"
    }
  }
};
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -4px;
  margin-left: -4px;
}
</style>