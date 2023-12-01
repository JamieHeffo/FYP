from transformers import FlaxAutoModelForSeq2SeqLM, AutoTokenizer
# /var/folders/py/6l01gxss5p7648qk39k9jw_h0000gn/T/com.apple.useractivityd/shared-pasteboard/items/C0A78C1E-C76B-4B32-93E3-159966146B87/dc010ce95ab471886be49afd3b5e45f25a63f98c.rtfd
MODEL_NAME_OR_PATH = "flax-community/t5-recipe-generation"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME_OR_PATH, use_fast=True)
model = FlaxAutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME_OR_PATH)

prefix = "items: "
generation_kwargs = {
    "max_length": 512,
    "min_length": 64,
    "no_repeat_ngram_size": 3,
    "do_sample": True,
    "top_k": 60,
    "top_p": 0.95
}

special_tokens = tokenizer.all_special_tokens
tokens_map = {
    "<sep>": "--",
    "<section>": "\n"
}

ingredients_quantities = {"carrots": 2, "broccoli": 1, "onion": 1}


def format_ingredients(ingredients_quantities):
    formatted_ingredients = [
        f"{quantity} {ingredient}" for ingredient, quantity in ingredients_quantities.items()]
    return ', '.join(formatted_ingredients)


def skip_special_tokens(text, special_tokens):
    for token in special_tokens:
        text = text.replace(token, "")

    return text


def target_postprocessing(texts, special_tokens):
    if not isinstance(texts, list):
        texts = [texts]

    new_texts = []
    for text in texts:
        text = skip_special_tokens(text, special_tokens)

        for k, v in tokens_map.items():
            text = text.replace(k, v)

        new_texts.append(text)

    return new_texts


def print_formatted_recipe(title, ingredients, instructions):
    print(f"Title: {title}\n")
    print("Ingredients:")
    for ingredient in ingredients:
        print(f"- {ingredient}")
    print("\nInstructions:")
    for i, instruction in enumerate(instructions, start=1):
        print(f"{i}. {instruction}")


def generation_function(ingredients_quantities):
    ingredients_text = format_ingredients(ingredients_quantities)
    input_text = f"Please generate a mexican style recipe with the following ingredients {prefix} {ingredients_text}. {prefix} {ingredients_text}. In the following format: Title, Ingredients, Instructions"

    inputs = tokenizer(
        input_text,
        max_length=256,
        padding="max_length",
        truncation=True,
        return_tensors="jax"
    )

    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask

    output_ids = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        **generation_kwargs
    )
    generated = output_ids.sequences
    generated_recipe = target_postprocessing(
        tokenizer.batch_decode(generated, skip_special_tokens=False),
        special_tokens
    )
    return generated_recipe


# Example usage
generated_recipe = generation_function(ingredients_quantities)
title, *recipe_parts = generated_recipe[0].split("\n")
ingredients, instructions = recipe_parts[1:-1], recipe_parts[-1].split(". ")
print_formatted_recipe(title, ingredients, instructions)
