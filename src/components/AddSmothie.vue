<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" placeholder="Type Smoothie Title Here...">
      </div>
      <div class="ingredient-list" v-for="(ing, index) in ingredients" :key=index>
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
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
import slugify from 'slugify';
import db from '@/firebase/init';
export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: null,
      ingredients: [],
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    AddSmoothie() {
      if(this.title){
        this.feedback = null;
        // create slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection("smoothies").add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        }).then( () => {
          this.$router.push({name: 'Index'});
        })
          .catch( error => {
            console.log('error: ', error);
          })

      } else {
        this.feedback = "You must enter a smoothie title";
      }
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
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing;
      })
      console.log('clicked')
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
  .ingredient-list {
    position: relative;
  }
  .delete {
    cursor: pointer;
    position: absolute;
    bottom: 16px;
    color: #aaa;
    right: 0;
    font-size: 1.4em;
  }
</style>
