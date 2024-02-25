import json
from supabase import create_client
from config import SUPABASE_KEY
from config import SUPABASE_URL

# Replace these with your Supabase URL and API key
supabase_url = SUPABASE_URL
supabase_key = SUPABASE_KEY

# Initialize Supabase client
supabase = create_client(supabase_url, supabase_key)


def insertRecipe(response):
    try:
        data = json.loads(response)

        for user in data.get("users", []):
            print(f"Inserting user: {user}")
            try:
                # Issue with these lines, data not inserting
                supabase.table("users").upsert(user, on_conflict=["userid"])
                print("User inserted successfully.")
            except Exception as e:
                print(f"Error inserting user: {e}")

        # Insert data into Recipes table
        for recipe in data.get("Recipes", []):
            print(f"Inserting Recipe : {recipe}")
            supabase.table("Recipes").upsert(
                recipe, on_conflict=["RecipeID"])

        # Insert data into Ingredients table
        for ingredient in data.get("Ingredients", []):
            print(f"Inserting Ingredient : {ingredient}")
            supabase.table("ingredients").upsert(
                ingredient, on_conflict=["IngredientID"])

        # Insert data into RecipeIngredients table
        for recipe_ingredient in data.get("RecipeIngredients", []):
            print(f"Inserting Recipe Ingredient : {recipe_ingredient}")
            supabase.table("RecipeIngredients").upsert(
                recipe_ingredient, on_conflict=["RecipeID", "IngredientID"])

        # Insert data into Instructions table
        for instruction in data.get("Instructions", []):
            print(f"Inserting Instruction : {instruction}")
            supabase.table("Instructions").upsert(
                instruction, on_conflict=["InstructionID"])

        # Insert data into Notes table
        for note in data.get("Notes", []):
            print(f"Inserting Note : {note}")
            supabase.table("Notes").upsert(note, on_conflict=["NoteID"])

        print("Success")

    except Exception as e:
        print(f"Error: {e}")


def writeFile(response):
    try:
        data = json.loads(response)

        for recipe in data.get("Recipes", []):
            # Extract the recipe title and create a corresponding file name
            title = recipe.get("Title", "Untitled")
            file_name = f"{title}.json"

            try:
                # Open the file for writing ('w' mode) and write the response data
                with open(file_name, "w") as f:
                    f.write(response)
                print(
                    f"Successfully created and saved Recipe file: {file_name}")

            except FileExistsError:
                print(f"File already exists: {file_name}")

    except json.JSONDecodeError:
        print("Error decoding JSON")
    except Exception as e:
        print(f"An error occurred: {e}")
