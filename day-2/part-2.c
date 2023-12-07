#include <stdio.h>
#include <ctype.h>

#define LINE_MAX_LEN 256

#include "./common.h"

/**
 * @return Game index
 * Returns 0 if game is not possible
 */
unsigned int process_game(Game game)
{
    int bmax, gmax, rmax;
    for (int i = 0; i < game.n_rounds; ++i)
    {
        Round r = game.rounds[i];
        bmax = bmax < r.blue ? r.blue : bmax;
        gmax = gmax < r.green ? r.green : gmax;
        rmax = rmax < r.red ? r.red : rmax;
    }
    return bmax * gmax * rmax;
}

int main()
{
    FILE *f = fopen("input.txt", "r");
    char line[LINE_MAX_LEN];

    size_t set_power_sum = 0;
    while (fscanf(f, "%[^\n]\n", line) != -1)
    {
        Game game = parse_game(line);
        set_power_sum += process_game(game);
    }

    printf("Result: %d\n", set_power_sum);

    fclose(f);

    return 0;
}
