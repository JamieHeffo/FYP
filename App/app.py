from ObjectDetection import uniqueIngredients
from RecipeGenerator import generateResponse

recipeStyle = input("Please choose a style of cuisine: ")
protein = input("Add protein? y/n")

if protein == "y":
    uniqueIngredients.append(input("What protein: "))

# Prompt the user for input
# Also functions as a buffer while the object detection happens
prompt = f'Generate a {recipeStyle} cuisine style recipe using the following ingredients: {uniqueIngredients}.\
      in the format Title, Calories, Ingredients, Instructions, Notes'

# Generate a response to the user input
print(
    f"Detected {uniqueIngredients} \nGenerating a {recipeStyle} Recipe\nHang on tight!\n")
response = generateResponse(prompt)
print(response)
