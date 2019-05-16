<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" placeholder="Type Smoothie Title Here...">
      </div>
      <div v-for="(ing, index) in ingredients" :key=index>
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="add-ingredient" placeholder="Enter Ingredient here..."
        @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text"> {{ feedback }} </p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: null,
      ingredients: [],
      another: null,
      feedback: null
    }
  },
  methods: {
    AddSmoothie() {
      console.log(this.title);
      console.log(this.ingredients)
    },
    addIng(){
      if(this.another) {
         this.ingredients.push(this.another);
         this.another = null;
         this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient';
      }
      console.log(this.ingredients);
    }
  }
}
</script>
<style scopped>
  .add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }
  h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .field {
    margin: 20px auto;
  }
</style>
