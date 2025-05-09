# LingoBeats
An interactive web application to enhance Spanish-English language learning through music and quizzes

## Checkout Our Web App
[https://lingo-beats.netlify.app/](url) 

## Running the Project Locally

### Prerequisites
Ensure you have the following installed:
- [pnpm](https://pnpm.io/installation)
- Node.js (recommended latest LTS version)

1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd <repository-folder>/client
   ```

2. **Install Dependencies**
   ```sh
   pnpm i
   ```

3. **Travel to the Client folder**
   ```sh
   cd client
   ```

4. **Start the Development Server**
   ```sh
   pnpm run dev
   ```

5. **Access the Application**
   - Open your browser and go to `http://localhost:5173/` (or the port specified in the terminal).
  
## Lyrics Syncing
Ensure you have the following installed: 
- Aegisub (https://aegisub.org/downloads/)
- ffmpeg (https://ffmpeg.org/download.html)
1. Follow along with the Youtube tutorial created for this project (https://www.youtube.com/watch?v=mxODHRVwvVc&ab_channel=JacobHachey)
   
3. Find a suitable background image for the song
   
4. Run this command to generate a video with the subtitles and static image you selected:
   - ffmpeg -loop 1 -i "background.jpg" -i "song.mp3" -vf "ass=lyrics.ass" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "output.mp4"
