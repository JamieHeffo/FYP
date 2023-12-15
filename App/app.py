from ObjectDetection import uniqueIngredients
from RecipeGenerator import generateResponse
from database import insertRecipe
import json

recipeStyle = input("Please choose a style of cuisine : ")
protein = input("Add protein? y/n : ")

if protein == "y":
    uniqueIngredients.append(input("What protein : "))

JSON = ('\
    {\
    "Users": [],\
    "Recipes": [\
        {\
        "RecipeID": {{RecipeID}},\
        "UserID": {{UserID}},\
        "Title": "{{Title}}",\
        "Calories": {{Calories}}\
        }\
    ],\
    "Ingredients": [\
        {\
        "IngredientID": {{IngredientID}},\
        "Name": "{{IngredientName}}"\
        }\
    ],\
    "RecipeIngredients": [\
        {\
        "RecipeID": {{RecipeID}},\
        "IngredientID": {{IngredientID}},\
        "Amount": {{IngredientAmount}}\
        }\
    ],\
    "Instructions": [\
        {\
        "InstructionID": {{InstructionID}},\
        "RecipeID": {{RecipeID}},\
        "StepNumber": {{StepNumber}},\
        "Description": "{{InstructionDescription}}"\
        }\
    ],\
    "Notes": [\
        {\
        "NoteID": {{NoteID}},\
        "RecipeID": {{RecipeID}},\
        "AdditionalNotes": "{{AdditionalNotes}}"\
        }\
    ]\
    }')

# Prompt the user for input
# Also functions as a buffer while the object detection happens
prompt = f'Generate a {recipeStyle} cuisine style recipe using the following ingredients: {uniqueIngredients}.\
      in the format Title, Calories, Ingredients, Instructions, Notes. Ensure that there is no beginning or end to the response and that it fits the following schema {JSON}'

# Generate a response to the user input
print(
    f"Detected {uniqueIngredients} \nGenerating a {recipeStyle} Recipe\nHang on tight!\n")
response = generateResponse(prompt)
print(response)

try:
    json.loads(response)
except ValueError:
    print("Yikes")
