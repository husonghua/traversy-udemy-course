<template>
  <div 
    class="flex items-center justify-between w-full px-4 bg-white border border-gray-300 cursor-move"
    draggable="true" 
    :class="{'bg-gray-300': highlighted, 'text-green-700': correct}">
    <div >
      {{person}}
    </div>  
    <div>
      <i class="fas fa-grip-lines"></i>
    </div>  
  </div>
</template>

<script>
export default {
  props: ['index', 'person', 'correct'],
  data() {
    return {
      highlighted: false,
    }
  },
  mounted() {
    this.$el.addEventListener('drop', this.drop);
    this.$el.addEventListener('dragover', e => e.preventDefault());
    this.$el.addEventListener('dragenter', this.dragEnter);
    this.$el.addEventListener('dragleave', this.dragLeave);
    this.$el.addEventListener('dragstart', this.dragStart);
  },
  methods: {
    dragStart() {
      this.$emit('started', this.index);
    },
    drop() {
      this.$emit('dropped', this.index);
    },  
    dragEnter() {
       this.highlighted = true;
    }, 
    dragLeave() {
       this.highlighted = false;
    },  
  }
}
</script>

<style>

</style>