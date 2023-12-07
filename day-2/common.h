#pragma once

#include <stdlib.h>
#include <string.h>
#include <ctype.h>

typedef struct
{
    unsigned int blue;
    unsigned int green;
    unsigned int red;
} Round;

typedef struct
{
    unsigned int index;
    Round rounds[8];
    size_t n_rounds;
} Game;

Game parse_game(char *data)
{
    Game game = {0};

    char *inner_save_tok = NULL;
    char *outer_save_tok = NULL;
    char *tok = strtok_r(data, ":", &outer_save_tok);
    game.index = atoi(data + 5);

    tok = strtok_r(NULL, ";", &outer_save_tok);
    while (tok != NULL)
    {
        char *inner_tok = strtok_r(tok, ",", &inner_save_tok);

        while (inner_tok != NULL)
        {
            Round *r = &game.rounds[game.n_rounds];

            char *ptr;
            char snum[4];

            ptr = strstr(inner_tok, "blue");
            if (ptr)
            {
                sscanf(inner_tok, "%s ", snum);
                r->blue = strtol(snum, NULL, 10);
            }

            ptr = strstr(inner_tok, "red");
            if (ptr)
            {
                sscanf(inner_tok, "%s ", snum);
                r->red = strtol(snum, NULL, 10);
            }

            ptr = strstr(inner_tok, "green");
            if (ptr)
            {
                sscanf(inner_tok, "%s ", snum);
                r->green = strtol(snum, NULL, 10);
            }

            inner_tok = strtok_r(NULL, ",", &inner_save_tok);
        }
        game.n_rounds++;
        tok = strtok_r(NULL, ";", &outer_save_tok);
    }

    return game;
}