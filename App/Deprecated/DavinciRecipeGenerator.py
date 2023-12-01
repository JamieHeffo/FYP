import openai

# Set your OpenAI API key
openai.api_key = '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'


def generate_recipe(style, ingredients):
    # Customize the prompt based on your needs
    prompt = f"Generate a {''.join(style)} style recipe using the following ingredients: {', '.join(ingredients)}. in the format Title, Calories, Ingredients, Instructions, Notes"

    # Make a request to the OpenAI API
    response = openai.Completion.create(
        engine="text-davinci-003",  # You can experiment with different engines
        prompt=prompt,
        max_tokens=300,  # Adjust as needed
        temperature=0.7,  # Adjust to control randomness
        n=1  # Number of completions to generate
    )

    # Extract the generated recipe from the response
    recipe = response.choices[0].text.strip()

    return recipe


# Example usage
recipeStyle = input("Please choose a style of cuisine: ")
ingredients_list = ["2 carrots", "broccoli", "onion"]
generated_recipe = generate_recipe(recipeStyle, ingredients_list)

print("Generated Recipe:")
print(generated_recipe)
print(recipeStyle)
