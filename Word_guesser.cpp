#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

struct Guess {
    char letter;
    bool correct;
};

class HiddenWord {
private:
    string word;
    string displayWord;

public:
    HiddenWord(string w) {
        word = w;
        displayWord = string(w.length(), '_');
    }

    bool guessLetter(char letter) {
        bool found = false;
        for (size_t i = 0; i < word.size(); i++) {
            if (tolower(word[i]) == tolower(letter)) {
                displayWord[i] = word[i];
                found = true;
            }
        }
        return found;
    }

    string getDisplayWord() {
        return displayWord;
    }

    bool isComplete() {
        return displayWord == word;
    }
};
class HangmanFigure {
private:
    vector<string> stages;

public:
    HangmanFigure() {
        stages = {
            "  +---+\n      |\n      |\n      |\n     ===",
            "  +---+\n  O   |\n      |\n      |\n     ===",
            "  +---+\n  O   |\n  |   |\n      |\n     ===",
            "  +---+\n  O   |\n /|   |\n      |\n     ===",
            "  +---+\n  O   |\n /|\\  |\n      |\n     ===",
            "  +---+\n  O   |\n /|\\  |\n /    |\n     ===",
            "  +---+\n  O   |\n /|\\  |\n / \\  |\n     ==="
        };
    }

    void draw(int wrongGuesses) {
        if (wrongGuesses < stages.size()) {
            cout << stages[wrongGuesses] << endl;
        }
    }
};

int main() {
    string secretWord;
    int maxGuesses = 5;
    cout << "Enter the secret word: ";
    cin >> secretWord;
    system("clear"); 

    HiddenWord hw(secretWord);
    HangmanFigure hf;
    vector<Guess> guesses;
    int wrongGuesses = 0;
    bool gameOver = false;

    while (!gameOver) {
        cout << "\nWord: " << hw.getDisplayWord() << endl;
        hf.draw(wrongGuesses);

        cout << "Guesses so far: ";
        for (auto &g : guesses) {
            cout << g.letter << " ";
        }
        cout << endl;

        char letter;
        cout << "Enter a letter: ";
        cin >> letter;

        bool alreadyGuessed = false;
        for (auto &g : guesses) {
            if (tolower(g.letter) == tolower(letter)) {
                alreadyGuessed = true;
                break;
            }
        }
        if (alreadyGuessed) {
            cout << "You already guessed that letter!" << endl;
            continue;
        }

        Guess g;
        g.letter = letter;
        g.correct = hw.guessLetter(letter);
        guesses.push_back(g);

       if (g.correct) {
            cout << "Correct guess!" << endl;
        } else {
            cout << "Wrong guess!" << endl;
            wrongGuesses++;
        }

        if (hw.isComplete()) {
            cout << "\nCongratulations! You guessed the word: " << secretWord << endl;
            gameOver = true;
        } else if (wrongGuesses > maxGuesses) {
            hf.draw(maxGuesses);
            cout << "\nGame Over! The word was: " << secretWord << endl;
            gameOver = true;
        }
    }
    return 0;
}