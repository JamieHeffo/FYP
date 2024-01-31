from ObjectDetection import uniqueIngredients
from RecipeGenerator import generateResponse
from SaveRecipe import insertRecipe
from SaveRecipe import writeFile
import json

recipeStyle = input("Please choose a style of cuisine : ")
protein = input("Add protein? y/n : ")

if protein == "y":
    uniqueIngredients.append(input("What protein : "))

# Define the structure of response object
JSON = ('{\
  "Users": [\
    {"UserID": 1, "Username": "user1"}\
  ],\
  "Ingredients": [\
    {"IngredientID": 1, "Name": "IngredientA"},\
    {"IngredientID": 2, "Name": "IngredientB"}\
  ],\
  "Recipes": [\
    {"RecipeID": 1, "UserID": 1, "Title": "Recipe1", "Calories": 300},\
    {"RecipeID": 2, "UserID": 2, "Title": "Recipe2", "Calories": 200}\
  ],\
  "RecipeIngredients": [\
    {"RecipeID": 1, "IngredientID": 1, "Amount": 2},\
    {"RecipeID": 1, "IngredientID": 2, "Amount": 1},\
    {"RecipeID": 2, "IngredientID": 2, "Amount": 3}\
  ],\
  "Instructions": [\
    {"InstructionID": 1, "RecipeID": 1, "StepNumber": 1, "Description": "Step 1"},\
    {"InstructionID": 2, "RecipeID": 1, "StepNumber": 2, "Description": "Step 2"},\
    {"InstructionID": 3, "RecipeID": 2, "StepNumber": 1, "Description": "Step 1"}\
  ],\
  "Notes": [\
    {"NoteID": 1, "RecipeID": 1, "AdditionalNotes": "Note for Recipe1"},\
    {"NoteID": 2, "RecipeID": 2, "AdditionalNotes": "Note for Recipe2"}\
  ]\
}')

# Prompt the user for input
# Also functions as a buffer while the object detection happens
prompt = f'Generate a {recipeStyle} cuisine style recipe using the following ingredients: {uniqueIngredients}.\
      in the format Title, Calories, Ingredients, Instructions, Notes. Ensure that there is no beginning or end to the response and that it fits the following schema {JSON}. The user is Jamie and the id is 1'

# Generate a response to the user input
print(
    f"Detected {uniqueIngredients} \nGenerating a {recipeStyle} Recipe\nHang on tight!\n")
response = generateResponse(prompt)
# print(response)

# Save the generated recipe
saveOption = input("Would you like to save this recipe? y/n")
if saveOption == 'y' or 'Y':
    try:
        # insertRecipe(response)
        writeFile(response)
    except ValueError:
        print("Didnt insert data")
