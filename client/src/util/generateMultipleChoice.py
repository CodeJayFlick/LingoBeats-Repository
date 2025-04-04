import os
import random
import json
import re
# Needs to be installed locally using pip
from deep_translator import GoogleTranslator

# Each phrase in the lyrics need to be seperated with ";". 
# The script will automatically generate fill in the 
# blank questions for each phrase. The script will also take
# random words and create translation questions. The amount
# of translation questions generated can be adjusted at the bottom.
# Have python installed and run the command "py generateQuestions.py".
# You can change the input file at the bottom.
def clean_word(word):
    cleaned = re.sub(r'[^\w\s]', '', word)  # Remove punctuation
    words = cleaned.split()

    if any(w == "I" for w in words):
        return cleaned
    return cleaned.lower()

def generate_fill_in_the_blank_questions(file_name, num_options=4):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_name)

    with open(file_path, 'r', encoding='utf-8') as file:
        lyrics = file.read()

    phrases = [phrase.strip() for phrase in lyrics.split(';') if phrase.strip()]
    all_words = list(set(clean_word(w) for w in lyrics.replace(';', ' ').split() if w)) 
    questions = []

    for phrase in phrases:
        words = [clean_word(w) for w in phrase.split()]
        if len(words) > 1:
            missing_word = random.choice(words)
            blank_phrase = phrase.replace(missing_word, '_' * len(missing_word), 1)

            # Generate multiple-choice options
            options = [missing_word] + random.sample([w for w in all_words if w and w != missing_word], min(num_options - 1, len(all_words) - 1))
            random.shuffle(options)

            questions.append({
                "question": blank_phrase,
                "answer": missing_word,
                "options": options
            })

    return questions


def generate_translation_questions(file_name, num_questions=10, num_options=4):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_name)

    with open(file_path, 'r', encoding='utf-8') as file:
        lyrics = file.read()

    words = list(set(clean_word(w) for w in lyrics.replace(';', ' ').split() if w))
    selected_words = random.sample(words, min(num_questions, len(words)))

    translator = GoogleTranslator(source="es", target="en")
    translations = {}

    for word in words:
        try:
            translations[word] = clean_word(translator.translate(word))
        except Exception:
            translations[word] = None

    translation_questions = []
    for word in selected_words:
        correct_translation = translations.get(word)
        if not correct_translation:
            continue

        # Generate multiple-choice options
        distractors = [t for t in translations.values() if t and t != correct_translation]
        options = [correct_translation] + random.sample(distractors, min(num_options - 1, len(distractors)))
        random.shuffle(options)

        translation_questions.append({
            "question": f"What is the English translation of '{word}'?",
            "options": options,
            "answer": correct_translation
        })

    return translation_questions


if __name__ == "__main__":
    file_name = "lyrics.txt"
    song_name = "Caballito Blanco"

    fill_in_the_blank_questions = generate_fill_in_the_blank_questions(file_name)
    translation_questions = generate_translation_questions(file_name, 10)

    # Wrap the questions in a quiz object
    quiz = {
        "name": song_name,
        "quiz": fill_in_the_blank_questions + translation_questions
    }

    print(json.dumps(quiz, indent=2, ensure_ascii=False))