from transformers import GPT2Tokenizer, GPT2LMHeadModel

# Load pre-trained GPT-2 model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')

# Text prompt for generation
text = "Please generate a recipe with the following ingredients: 2 carrots, broccoli, onion. In the following format: Title, Ingredients, Instructions"

# Tokenize input text and generate output
input_ids = tokenizer.encode(text, return_tensors='pt', max_length=512)
output = model.generate(input_ids, max_length=150, num_return_sequences=1,
                        no_repeat_ngram_size=2, top_k=50, top_p=0.95, temperature=0.7)

# Decode and print the generated text
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print("Generated Recipe:")
print(generated_text)
