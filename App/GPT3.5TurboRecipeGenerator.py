import os
import openai
from config import GPT_KEY

# Authenticate with OpenAI
# Remember to export OPENAI_API_KEY= in the terminal first.
# os.getenv("OPENAI_API_KEY")
openai.api_key = GPT_KEY

# Define a function to prompt the user for input and generate a response


def generate_response(prompt):
    # Call the OpenAI API to generate a response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "I am a world class chef who has made it their life goal to create easy to cook recipes for anyone regardless of culinary experience"}, {
            'role': 'user', 'content': prompt}],
        max_tokens=300,
        n=1,
        temperature=0.5,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.6,
    )

    # Get the response text from the API response
    response_text = response['choices'][0]['message']['content']

    return response_text


# Start the conversation with the user
print("*****CookSmart Recipe Generator*****")

# Loop to continue the conversation until the user exits
<<<<<<< Updated upstream:App/GPT3.5TurboRecipeGenerator.py
# recipeStyle = input("Please choose a style of cuisine: ")
recipeStyle = 'French'
ingredients_list = ["Chicken", "2 carrots", "broccoli", "onion"]

# Combine the ingredients into a formatted string
formatted_ingredients = ', '.join(ingredients_list)
=======

>>>>>>> Stashed changes:App/RecipeGenerator.py

# while True: Loop if we want a response from the user
# Prompt the user for input
prompt = f'Generate a {recipeStyle} cuisine style recipe using the following ingredients: {formatted_ingredients}. in the format Title, Calories, Ingredients, Instructions, Notes'

# Generate a response to the user input
response = generate_response(prompt)

# Print the response
print(response)
