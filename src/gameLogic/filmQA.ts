interface Movie {
    title: string;
    episode_id: number;
    director: string;
    release_date: string;
}

export class FilmQA {
    private qaMap: Map<string, string>
    private incorrectAnswers: Record<string, string[]>;

    constructor(films: Movie[]) {
        this.qaMap = new Map();

        // time pressures require hardcoding these answers upfront, knowing the information that is coming down.
        // however, we could deduce random "correct" answers based on the data itself e.g. get film data for 'A new hope'
        // and get two random release dates from the rest of the data
        this.incorrectAnswers = {
            "The Last Jedi": ["Return of the Jedi", "A Phantom Menace"],
            "George Lucas": ["Irvin Kershner", "Richard Marquand"],
            "Irvin Kershner": ["George Lucas", "Richard Marquand"],
            "Richard Marquand": ["George Lucas", "Irvin Kershner"],
            "1977-05-25": ["1980-05-17", "1999-05-19"],
            "1980-05-17": ["1977-05-25", "1999-05-19"],
            "1983-05-25": ["1984-08-12", "1982-04-01"],
            "1999-05-19": ["1977-05-25", "1980-05-17"],
            "2002-05-16": ["2005-05-19", "1999-05-19"],
            "2005-05-19": ["2002-05-16", "1999-05-19"],
        }

        // sorry, I just had to get this one in...
        this.qaMap.set('Which is the worst movie of the following?', 'The Last Jedi')

        films.forEach(film => {
            const directorQ = `Who directed ${film.title}?`;
            const releaseQ = `When was ${film.title} released?`;
        
            this.qaMap.set(directorQ, film.director);
            this.qaMap.set(releaseQ, film.release_date);
        });
    }

    // Get all the questions
    getQuestions(): string[] {
        return Array.from(this.qaMap.keys());
    }

    // Get the answer along with incorrect alternatives
    getAnswers(question: string): { correct: string, incorrect: string[]} {
        const answer = this.qaMap.get(question);
        if (answer) {
            const incorrectOptions = this.incorrectAnswers[answer];
            console.log(question, answer, incorrectOptions)
            return {
                correct: answer,
                incorrect: [incorrectOptions[0], incorrectOptions[1]]
            }
        }
        throw new Error('no answers returned for some reason?')
    }
}