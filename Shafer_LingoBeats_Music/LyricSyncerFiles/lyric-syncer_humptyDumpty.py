import pygame
import time
from pysubs2 import SSAFile, SSAEvent, make_time

# === CONFIGURATION ===
AUDIO_FILE = "/Users/oliviashafer/Documents/GitHub/LingoBeats-Repository/Shafer_LingoBeats_Music/Humpty Dumpty (Spanish Version) - The Countdown Kids  Kids Songs & Nursery Rhymes  Lyric Video.mp3"
SPANISH_FILE = "humpty_Dumpty_spanish.txt"
ENGLISH_FILE = "humpty_Dumpty_english.txt"
OUTPUT_FILE = "output.ass"

# Load lyrics
with open(SPANISH_FILE, "r", encoding="utf-8") as f:
    spanish_lines = [line.strip() for line in f if line.strip()]
with open(ENGLISH_FILE, "r", encoding="utf-8") as f:
    english_lines = [line.strip() for line in f if line.strip()]

# Warn if line count mismatch
if len(spanish_lines) != len(english_lines):
    print(f"⚠️ Warning: {len(spanish_lines)} Spanish vs {len(english_lines)} English lines")

# Init audio
pygame.mixer.init()
pygame.mixer.music.load(AUDIO_FILE)

# Instructions
print("\nInstructions:")
print("  - Press ENTER to sync each line with current playback time.")
print("  - Use Ctrl+C to exit early if needed.\n")

input("Press ENTER to start playback...")
pygame.mixer.music.play()
start_time = time.time()

# Sync loop
subtitles = SSAFile()
index = 0

try:
    while index < min(len(spanish_lines), len(english_lines)):
        input(f"▶️  Press ENTER to sync line {index+1}/{len(spanish_lines)}")
        current_time = time.time() - start_time
        combined_text = f"{spanish_lines[index]}\\N{english_lines[index]}"
        event = SSAEvent(
            start=make_time(int(current_time * 1000)),
            end=make_time(int(current_time * 1000) + 3000),
            text=combined_text
)
        subtitles.events.append(event)
        print(f"✅ Synced: {combined_text}")
        index += 1
except KeyboardInterrupt:
    print("\n⏹️ Syncing stopped early by user.")

# Save file
subtitles.save(OUTPUT_FILE)
pygame.mixer.music.stop()
print(f"\n💾 Saved subtitles to {OUTPUT_FILE}")