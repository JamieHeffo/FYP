/*
// To Run : npx expo start
*/
//imports
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from './supabase/supabase';

// Icons
import AddIcon from './src/assets/AddIconImage.png';

// Components
import ToDoItem from './src/components/ToDoItem';
import ModalComponent from './src/components/ModalComponent';

// Main component
function App(): React.JSX.Element {

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch items from Supabase
  const getItems = async () => {
    // Using Supabase client to fetch data from 'Items' table
    let { data: Items, error } = await supabase
      .from('Items')
      .select('*');

    return Items;
  }

  // Function to insert an item into Supabase
  const addNewItem = async (item) => {

    const { data: Items, error } = await supabase
      .from('Items')
      .insert([
        { description: item, completed: false },
        //{ completed: false }, adds a whole new empty for with just completed
      ])

    return Items
  }

  const saveItem = (item) => {
    addNewItem(item)
      .then(() => {
        getItems()
          .then((items) => {
            //set items after collection
            setItems(items);
          })
      })
  }

  // useEffect hook to fetch items when the component mounts
  useEffect(() => {
    getItems()
      .then((items) => {
        //set items after collection
        setItems(items);
      })
  }, []);

  // Render method
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.scrollView}>
        <Text style={styles.heading}>My Shopping List</Text>
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <>
              <ToDoItem item={item} />
            </>
          )}
          keyExtractor={item => item.id}
        />
        {/* Add New Item View */}
        <TouchableOpacity style={styles.AddButton} onPress={() => setShowModal(true)}>
          <Image source={AddIcon} style={styles.AddIconImage} />
        </TouchableOpacity>
      </View>

      {showModal ? <ModalComponent saveNewItem={saveItem} hideModal={() => setShowModal(false)} /> : null}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F887A8'
  },

  scrollView: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
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
    display: 'flex',
    bottom: 0,
    right: 0,
    position: 'absolute',
    margin: '5%',
    //Dropshadow stuff here
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    //End Dropshadow stuff
    alignItems: 'center',
    justifyContent: 'center'
  },

  AddIconImage: {
    width: 70,
    height: 70,
  },
});

// Exporting the component as the default export
export default App;
