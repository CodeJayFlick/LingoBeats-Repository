import os
import random
import json
# This module needs to be installed locally using pip
from deep_translator import GoogleTranslator

# Each phrase in the lyrics need to be seperated with ";". 
# The script will automatically geneerate fill in the 
# blank questions for each phrase. The script will also take
# random words and create translation questions. The amount
# of translation questions generated can be adjusted at the bottom.
# Have python installed and run the command "py generateQuestions.py".
# You can change the file input at the bottom.

def generate_fill_in_the_blank_questions(file_name):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_name)

    with open(file_path, 'r', encoding='utf-8') as file:
        lyrics = file.read()

    phrases = [phrase.strip()
               for phrase in lyrics.split(';') if phrase.strip()]
    questions = []

    for phrase in phrases:
        words = phrase.split()
        if len(words) > 1:
            missing_word = random.choice(words)
            blank_phrase = phrase.replace(
                missing_word, '_' * len(missing_word), 1)
            questions.append({
                "question": blank_phrase,
                "answer": missing_word
            })

    return questions


def generate_translation_questions(file_name, num_questions):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_name)

    with open(file_path, 'r', encoding='utf-8') as file:
        lyrics = file.read()

    words = list(set(lyrics.replace(';', ' ').split()))
    selected_words = random.sample(words, min(
        num_questions, len(words))) 

    translator = GoogleTranslator(
        source="es", target="en")  # Spanish to English

    translation_questions = []
    for word in selected_words:
        try:
            translated_word = translator.translate(word)
            translation_questions.append({
                "question": f"What is the English translation of '{word}'?",
                "answer": translated_word
            })
        except Exception as e:
            print(f"Translation failed for '{word}': {e}")

    return translation_questions

if __name__ == "__main__":
    file_name = "lyrics.txt"
    fill_in_the_blank_questions = generate_fill_in_the_blank_questions(
        file_name)
    translation_questions = generate_translation_questions(
        file_name, 10)

    print("Fill in the Blank Questions:")
    print(json.dumps(fill_in_the_blank_questions, indent=2, ensure_ascii=False))

    print("\nTranslation Questions:")
    print(json.dumps(translation_questions, indent=2, ensure_ascii=False))
