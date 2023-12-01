from ObjectDetection import uniqueIngredients
from RecipeGenerator import generateResponse

recipeStyle = input("Please choose a style of cuisine: ")

# Prompt the user for input
prompt = f'Generate a {recipeStyle} cuisine style recipe using the following ingredients: {uniqueIngredients}. in the format Title, Calories, Ingredients, Instructions, Notes'

# Generate a response to the user input
print(
    f"Detected {uniqueIngredients} \nGenerating a {recipeStyle} Recipe\nHang on tight!")
response = generateResponse(prompt)
print(response)
