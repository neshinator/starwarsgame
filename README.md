# Star Wars Trivia Game

## Project Overview

This is a **Star Wars trivia mini-game** built with React that uses the **Star Wars API (SWAPI)**. Players test their knowledge by selecting answers from multiple choices. The goal is to create a fun way to engage with Star Wars trivia, with the potential for the game to be fully driven by API data in the future.

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/neshinator/starwarsgame.git
   cd starwarsgame
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Other commands

1. Plop:
   ```sh
   npm run plop
   ```
   To maintain a standard for component creation, the plop feature 'plops' a template of files into a given component folder for faster creation and standardisation.

2. Storybook:
   ```sh
   npm run storybook
   ```
   Component creation in isolation is a pragmatic approach in order to create self-encapsulating robust features. Also it's easier for developers to test in StoryBook against different mocked data.

3. Unit test:
    ```sh
   npm run test
   ```
   Run vitest unit tests

4. E2E test:
    ```sh
   npm run test:e2e
   ```
   Run e2e tests in playwright

## Future Improvements

- Refactor the 'level' logic which became a bottleneck and could be abstracted away into different components.
- Add difficulty levels for varied gameplay experience by making further calls to the api for different data e.g. characters, planets.
- Work on the design, specifically cards and buttons
- Accessibility - time constraints meant that I didn't spend any time specifically coding a11y features - though I used native elements e.g. dialog so that some native support for a11y comes with the components.
- Though I specifically designed mobile-first, some of the css styling needs a lot more TLC. I probably made a mistake going the scss route - though I think in the long term it's easier to maintain it can be cumbersome to set up and deliver. Use of tailwind would have resulted in faster results and even better programmability.
- Unit tests and e2e tests - only enough time to get barely the minimum working. I tried installing cypress but couldn't get it to work so ended up going for playwright (which I've not used before).
- Comments - the plop file comment structure gives a great way to layout components so that you can get tooltips from your IDE when importing or using those components. However, those comments take time to update and so most of the boilerplate comments are still in use and need changing.

## License

This project is licensed under the MIT License.
