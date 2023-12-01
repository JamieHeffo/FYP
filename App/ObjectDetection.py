from roboflow import Roboflow
from config import ROBOFLOW_KEY

rf = Roboflow(api_key=ROBOFLOW_KEY)
project = rf.workspace().project("vegetables-xfglo")
model = project.version(1).model

# Path to the image file
filePath = "TrainingDataV1/Test.jpg"

# infer on a local image and return JSON file
prediction_result = model.predict(
    filePath, confidence=40, overlap=30).json()

# Extract information from the prediction result
predictions = prediction_result.get("predictions", [])
image_info = prediction_result.get("image", {})

# Print informative message to the user
print(f"+-----------------------------------------------------+")
print("\t\t  Image Information")
print(f"+-----------------------------------------------------+")
print(f"Resolution  : {image_info.get('width')} x {image_info.get('height')}")

# List items found
print("Items Found :")
for prediction in predictions:
    print(f"     - {prediction['class']}")
print(f"+-----------------------------------------------------+")

# Print full details
print("\t\t  Objects detected")
print(f"+-----------------------------------------------------+")

for prediction in predictions:
    print(f"| Class: {prediction['class']}")
    print(f"| Confidence: {prediction['confidence']}")
    print(
        f"| Bounding Box: X: {prediction['x']}, Y: {prediction['y']} \n| Width : {prediction['width']}, Height : {prediction['height']}")
    print()
print(f"+-----------------------------------------------------+")

# save prediction to  file
model.predict(filePath, confidence=40, overlap=30).save("result.jpg")

# Extracting unique ingredients with their counts
unique_ingredients = {}
for prediction in predictions:
    ingredient = prediction['class']
    unique_ingredients[ingredient] = unique_ingredients.get(ingredient, 0) + 1

# Creating a new list with ingredients and their counts
unique_ingredients_list = [f"{count} {ingredient} " if count >
                           1 else ingredient for ingredient, count in unique_ingredients.items()]

# Printing the new list
print("Unique Ingredients:")
for unique_ingredient in unique_ingredients_list:
    print(f"     - {unique_ingredient}")

# infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())
