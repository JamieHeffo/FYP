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

  //after this

  const addNewItem = async (item) => {
    const { data: Items, error } = await supabase
      .from('Items')
      .insert([
        { description: item, completed: false },
      ]);

    return Items;
  }

  const addNewRecipe = async (recipeTitle: string) => {
    const { data: Recipes, error } = await supabase
      .from('recipes')
      .insert([{ title: recipeTitle, calories: 200 }]);

    if (error) {
      console.log('Error inserting recipe title:', error);
      return Recipes;
    }
    return Recipes;
  }

  const saveItem = (item) => {
    addNewItem(item)
      .then(() => {
        getItems()
          .then((items) => {
            setItems(items);
          })
      })
  }

  const saveRecipe = (recipeTitle) => {
    addNewRecipe(recipeTitle)
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
