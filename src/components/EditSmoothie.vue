<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }}</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" placeholder="Type Smoothie Title Here...">
      </div>
      <div class="ingredient-list" v-for="(ing, index) in smoothie.ingredients" :key=index>
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="add-ingredient" placeholder="Enter Ingredient here..."
        @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text"> {{ feedback }} </p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init';
import slugify from 'slugify';
export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  methods: {
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient !== ing;
      })
      console.log('clicked')
    },
    addIng(){
      if(this.another) {
         this.smoothie.ingredients.push(this.another);
         this.another = null;
         this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient';
      }
      console.log(this.ingredients);
    },
    EditSmoothie() {
      if(this.smoothie.title){
        this.feedback = null;
        // create slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection("smoothies").doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then( () => {
          this.$router.push({name: 'Index'});
        })
          .catch( error => {
            console.log('error: ', error);
          })
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    }
  },
  created() {
    /*
    Where takes in 3 parameters:{
      1: property inside of the records that is stored in collections --- slug
      2: validation parameter (if it's greater or lower or equal)3: what do we want to be compared to
    }
    */
    let ref = db.collection("smoothies").where('slug', '==', this.$route.params.smoothie_slug)
    ref.get().then( (snapshot) => {
      snapshot.forEach( doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      })
    })
  }
}
</script>
<style scopped>
.edit-smoothie {
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
