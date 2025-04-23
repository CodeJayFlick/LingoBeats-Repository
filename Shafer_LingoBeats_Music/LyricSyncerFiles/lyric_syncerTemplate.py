import pygame
import time
from pysubs2 import SSAFile, SSAEvent, make_time

# === CONFIGURATION ===
AUDIO_FILE = "song.mp3"
SPANISH_FILE = "spanish.txt"
ENGLISH_FILE = "english.txt"
OUTPUT_FILE = "output.ass"

# Load lyrics
with open(SPANISH_FILE, "r", encoding="utf-8") as f:
    spanish_lines = [line.strip() for line in f if line.strip()]
with open(ENGLISH_FILE, "r", encoding="utf-8") as f:
    english_lines = [line.strip() for line in f if line.strip()]

# Ensure same number of lines
if len(spanish_lines) != len(english_lines):
    print("Warning: Spanish and English lyrics have different lengths!")

# Initialize pygame mixer
pygame.mixer.init()
pygame.mixer.music.load(AUDIO_FILE)

print("\nInstructions:")
print("  - Press SPACE to sync next line with current playback time.")
print("  - Press ESC to finish syncing.\n")

input("Press ENTER to start playback...")
pygame.mixer.music.play()

subtitles = SSAFile()
index = 0
start_time = time.time()

while index < min(len(spanish_lines), len(english_lines)):
    for event in pygame.event.get():
        pass  # prevent pygame from freezing

    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE]:
        current_time = time.time() - start_time
        combined_text = f"{spanish_lines[index]}\N{english_lines[index]}"
        event = SSAEvent(start=make_time(milliseconds=int(current_time * 1000)),
                         end=make_time(milliseconds=int(current_time * 1000) + 3000),
                         text=combined_text)
        subtitles.events.append(event)
        print(f"Synced: {combined_text}")
        index += 1
        time.sleep(0.3)  # debounce
    elif keys[pygame.K_ESCAPE]:
        break

# Save subtitles
subtitles.save(OUTPUT_FILE)
print(f"\nSaved subtitles to {OUTPUT_FILE}")
pygame.mixer.music.stop()
