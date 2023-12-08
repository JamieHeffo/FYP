# CookSmart : Exploring Object Detection and Recipe Generation using Machine Learning

## Overview

CookSmart is a project that combines object detection and natural language processing to automatically generate recipes based on detected ingredients. It utilizes the Roboflow API for object detection and OpenAI's GPT-3.5-turbo for recipe generation.

## Features

- **Object Detection:** Identify ingredients in an image using Roboflow.
- **Recipe Generation:** Generate a recipe based on the detected ingredients and user preferences using OpenAI GPT-3.5-turbo.

## Getting Started

1. Clone the repository: `git clone https://github.com/JamieHeffo/FYP.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Set up API keys: Obtain API keys for Roboflow and OpenAI. Update the `config.py` file with your keys.
4. Run the main script: `python main.py`

## Usage

1. Run the script and follow the prompts.
2. Choose a cuisine style and optionally add ingredients.
3. The script will detect ingredients and generate a recipe using the specified style and ingredients.

## Dependencies

- [Roboflow Python Package](https://github.com/roboflow-ai/roboflow-python): Used for object detection.
- [OpenAI Python Package](https://github.com/openai/openai): Used for natural language processing.

## Configuration

- Update `config.py` with your Roboflow and OpenAI API keys.

## Algorithm Overview

The SmartRecipeGenerator follows a multi-step process to identify ingredients in an image and generate a corresponding recipe.

### 1. Object Detection using Roboflow

The project utilizes the Roboflow API for object detection. The `ObjectDetection.py` script takes an image as input, identifies ingredients present in the image, and extracts relevant information such as class, confidence, and bounding box coordinates.

### 2. User Input and Recipe Generation

The main script (`main.py`) prompts the user to choose a cuisine style and optionally add specific ingredients. If the user adds ingredients, the list is combined with the ingredients detected in the image. The combined list is then used to create a prompt for the recipe generation step.

### 3. Recipe Generation using OpenAI GPT-3.5-turbo

The `RecipeGenerator.py` script leverages OpenAI's GPT-3.5-turbo model for natural language processing. It takes the user's prompt, including the cuisine style and ingredients, and generates a detailed recipe in the specified format. The response from GPT-3.5-turbo is then printed, providing the user with the generated recipe.

## Workflow

1. User provides input on cuisine style and optional ingredients.
2. Object detection identifies ingredients in an image using Roboflow.
3. User input and detected ingredients are used to create a prompt for recipe generation.
4. OpenAI's GPT-3.5-turbo generates a detailed recipe based on the prompt.
5. The generated recipe is displayed to the user.

This combined approach aims to streamline the recipe creation process by automating both ingredient identification and recipe generation.
