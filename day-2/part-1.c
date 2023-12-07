#include <stdio.h>
#include <ctype.h>

#define LINE_MAX_LEN 256

#include "./common.h"

/**
 * @return Game index
 * Returns 0 if game is not possible
 */
int game_possibility(Game game)
{
    int possible = 1;
    for (int i = 0; i < game.n_rounds; ++i)
    {
        Round r = game.rounds[i];
        possible *= r.blue > 14 ? 0 : 1;
        possible *= r.green > 13 ? 0 : 1;
        possible *= r.red > 12 ? 0 : 1;

        if (possible == 0)
            return 0;
    }
    return game.index;
}

int main()
{
    FILE *f = fopen("input.txt", "r");
    char line[LINE_MAX_LEN];

    size_t index_sum = 0;
    while (fscanf(f, "%[^\n]\n", line) != -1)
    {
        Game game = parse_game(line);
        index_sum += game_possibility(game);
    }

    printf("Result: %d\n", index_sum);

    fclose(f);

    return 0;
}
