import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from './supabase/supabase';
import AddIcon from './src/assets/AddIconImage.png';
import ToDoItem from './src/components/ToDoItem';
import AddRecipeModal from './src/components/AddRecipeModal';

function App(): React.JSX.Element {
  const [recipeName, setRecipeName] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to get all the recipe names from the database
  const getRecipeName = async () => {
    let { data: recipes, error } = await supabase
      .from('recipes')
      .select('*');

    return recipes;
  }

  //Hook to fetch recipe titles when the component mounts
  useEffect(() => {
    getRecipeName()
      .then((recipes) => {
        setRecipeName(recipes);
      })
  }, []);

  // * INSERTING DATA

  // Function to add a new recipe to the database
  const addNewRecipe = async (recipeTitle: string, instructions: string[]) => {

    // Recipe title
    const { data: Recipes, error: recipeError } = await supabase
      .from('recipes')
      .insert([{ title: recipeTitle, calories: 200 }])
      .select('*');

    // Get the recipe ID from previous select statement
    const recipeId = Recipes[0].recipeid;

    //Check if something went wrong
    console.log('Recipe Title:', recipeTitle);
    console.log('Instructions', [...instructions]);
    console.log('Recipe ID: ', recipeId);


    // Instruction Data 
    const instructionsData = instructions.map((instruction, index) => ({
      recipeid: recipeId,
      stepnumber: index + 1,  // Assuming step numbers start from 1
      description: instruction,
    }))

    // Instructions
    const { data: Instructions, error: instructionError } = await supabase
      .from('instructions')
      .insert(instructionsData)
      //.insert(instructions.map((instruction) => ({ recipeid: recipeId, description: instruction })))
      //.insert([{ instructionid: 420, recipeid: 5, stepnumber: 1, description: 'Preheat the oven to 350 degrees' }])
      .select('*');

    console.log('Instruction Error:', instructionError);

    return Recipes;
  }


  // Function to save a new recipe
  const saveRecipe = (recipeTitle: string, instructions: string[]) => {
    addNewRecipe(recipeTitle, instructions)
      .then(() => {
        getRecipeName()
          .then((recipes) => {
            setRecipeName(recipes);
          })
      })
  }


  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.scrollView}>
        <Text style={styles.heading}>My Shopping List</Text>
        <FlatList
          data={recipeName}
          renderItem={({ item, index }) => (
            <ToDoItem item={item} />
          )}
          keyExtractor={item => item.recipeid.toString()}
        />
        <TouchableOpacity style={styles.AddButton} onPress={() => setShowModal(true)}>
          <Image source={AddIcon} style={styles.AddIconImage} />
        </TouchableOpacity>
      </View>

      {showModal ? <AddRecipeModal saveNewRecipe={saveRecipe} hideModal={() => setShowModal(false)} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F887A8'
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#847DA4',
    padding: '5%',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F887A8',
    marginTop: '5%',
    marginBottom: '5%'
  },

  AddButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '5%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  AddIconImage: {
    width: 70,
    height: 70,
  },
});

export default App;
