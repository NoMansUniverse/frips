import React from "react";

import { Box, Divider, IconButton, MenuItem } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { navigationCatalogue } from "./staticNavigationCatalogue";

export const Catalogue = [
  {
    id: 1,
    Name: "Femme",
    type: "list",
    subitems: [
      {
        upId: 1,
        Name: "Vêtements",

        id: 2,

        type: "list",

        subitems: [
          {
            upId: 2,

            type: "list",

            Name: "Manteaux & Vestes",
            id: 3,
            subitems: [
              {
                upId: 3,
                type: "list",
                Name: "Manteaux",
                id: 4,
                subitems: [
                  {
                    upId: 4,
                    sizeType: 0,
                    Name: "Parkas",

                    id: 5,
                  },
                  {
                    upId: 4,
                    sizeType: 0,
                    Name: "Manteaux longs",

                    id: 6,
                  },
                  {
                    upId: 4,

                    sizeType: 0,
                    Name: "Manteaux d'hivers",

                    id: 7,
                  },
                  {
                    upId: 4,
                    sizeType: 0,
                    Name: "Imperméables",
                    id: 8,
                  },
                ],
              },
              {
                upId: 3,

                type: "list",
                Name: "Vestes",
                id: 9,
                subitems: [
                  {
                    id: 10,
                    upId: 9,
                    Name: "Blouson aviateur",
                    sizeType: 0,
                  },
                  {
                    id: 11,
                    Name: "Vestes en jean",
                    upId: 9,
                    sizeType: 0,
                  },
                  {
                    id: 12,
                    Name: "Vestes en cuir ",
                    upId: 9,
                    sizeType: 0,
                  },
                  {
                    id: 13,
                    Name: "Vestes légères",
                    upId: 9,
                    sizeType: 0,
                  },
                  {
                    id: 14,
                    Name: "Vestes polaires",
                    upId: 9,
                    sizeType: 0,
                  },
                ],
              },
              {
                upId: 3,
                Name: "Manteaux",
                id: 15,
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,

            type: "list",
            Name: "Sweats & Pulls",

            id: 16,
            subitems: [
              {
                id: 18,
                type: "list",
                upId: 16,
                Name: "Sweats",
                subitems: [
                  {
                    id: 17,
                    sizeType: 0,
                    Name: "Sweats à capuche",
                    upId: 18,
                  },
                  {
                    id: 21,
                    Name: "Sweats longs",
                    upId: 18,
                    sizeType: 0,
                  },
                  {
                    id: 23,
                    Name: "Autres sweats",
                    upId: 18,
                    sizeType: 0,
                  },
                ],
              },
              {
                id: 14,
                type: "list",
                upId: 16,
                Name: "Pulls",
                subitems: [
                  {
                    id: 22,
                    Name: "Pulls d'hiver",
                    upId: 18,
                    sizeType: 0,
                  },
                  {
                    id: 19,
                    Name: "Pulls col V",
                    upId: 18,
                    sizeType: 0,
                  },
                  {
                    id: 20,
                    Name: "Pulls col roulé",
                    upId: 18,
                    sizeType: 0,
                  },
                ],
              },
              {
                id: 25,
                upId: 16,
                Name: "Autres Sweats & pull-overs",
              },
            ],
          },
          {
            upId: 2,
            Name: "Blazers & tailleurs",

            type: "list",
            id: 26,
            subitems: [
              {
                upId: 26,
                Name: "Blazers",
                id: 27,
                sizeType: 0,
              },
              {
                upId: 26,
                Name: "Ensemble tailler/pantalon",
                id: 28,
                sizeType: 0,
              },
              {
                upId: 26,
                Name: "Autres ensembles & tailleurs",
                id: 29,
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,
            Name: "Robes",

            type: "list",
            id: 30,
            subitems: [
              {
                upId: 30,
                id: 31,
                Name: "Robes courtes",
                sizeType: 0,
              },
              {
                upId: 30,
                id: 32,
                Name: "Robes longues",
                sizeType: 0,
              },
              {
                upId: 30,
                Name: "Robes d'été",
                id: 33,
                sizeType: 0,
              },
              {
                upId: 30,
                id: 34,
                Name: "Robes d'hiver",
                sizeType: 0,
              },
              {
                upId: 30,
                id: 35,
                Name: "Robes chics",
                sizeType: 0,
              },
              {
                upId: 30,
                id: 36,
                Name: "Robes sans bretelles",
                sizeType: 0,
              },
              {
                upId: 30,
                id: 36,
                Name: "Robes sans bretelles",
                sizeType: 0,
              },

              {
                upId: 30,
                id: 37,
                Name: "Robes de soirée",
                sizeType: 0,
              },
              {
                upId: 30,
                id: 38,
                Name: "Robes de mariée",
                sizeType: 0,
              },
              {
                upId: 30,
                id: 39,
                Name: "Autres robes",
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,
            Name: "Jupes",
            type: "list",
            id: 40,
            subitems: [
              {
                upId: 40,
                id: 41,
                Name: "Mini-jupes",
                sizeType: 0,
              },
              {
                upId: 40,
                id: 42,
                Name: "Jupes mi-longues",
                sizeType: 0,
              },
              {
                upId: 40,
                id: 43,
                Name: "Jupes longues",
                sizeType: 0,
              },
              {
                upId: 40,
                id: 44,
                Name: "Jupes taille haute",
                sizeType: 0,
              },
              {
                upId: 40,
                id: 45,
                Name: "Jupes tulipes",
                sizeType: 0,
              },
              {
                upId: 40,
                id: 46,
                Name: "Jupes patineuses",
                sizeType: 0,
              },
              {
                upId: 40,
                id: 47,
                Name: "Autres jupes",
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,
            Name: "Hauts & T-shirts",
            type: "list",
            id: 48,
            subitems: [
              {
                upId: 48,
                Name: "Chemises",
                id: 49,
                sizeType: 0,
              },
              {
                upId: 48,
                Name: "Blouses",
                id: 50,
                sizeType: 0,
              },
              {
                upId: 48,
                Name: "T-shirts",
                id: 51,
                sizeType: 0,
              },
              {
                upId: 48,
                Name: "Débardeurs",
                id: 52,
                sizeType: 0,
              },
              {
                upId: 48,
                Name: "Tuniques",
                id: 53,
                sizeType: 0,
              },
              {
                upId: 48,
                Name: "Tops courts",
                id: 54,
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,
            Name: "Pantalons & leggings",

            type: "list",
            id: 56,
            subitems: [
              {
                upId: 56,
                Name: "Pantalons skinny",
                id: 57,
                sizeType: 0,
              },
              {
                upId: 56,
                Name: "Pantalons en cuir",
                id: 58,
                sizeType: 0,
              },
              {
                upId: 56,
                Name: "Pantalons droits",
                id: 59,
                sizeType: 0,
              },
              {
                upId: 56,
                Name: "Leggings",
                id: 60,
                sizeType: 0,
              },
              {
                upId: 56,
                Name: "Sarouels",
                id: 61,
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,
            Name: "Shorts",
            type: "list",
            id: 62,
            subitems: [
              {
                upId: 62,
                Name: "Shorts taille haute",
                id: 63,
                sizeType: 0,
              },
              {
                upId: 63,
                Name: "Shorts taille basse",
                id: 64,
                sizeType: 0,
              },
              {
                upId: 63,
                Name: "Shorts en jeans",
                id: 65,
                sizeType: 0,
              },
              {
                upId: 63,
                Name: "Shorts en cuir",
                id: 66,
                sizeType: 0,
              },
              {
                upId: 63,
                Name: "Shorts cargo",
                id: 67,
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,
            Name: "Maillots de bain",
            id: 68,
            type: "list",
            subitems: [
              {
                upId: 68,
                Name: "Une pièce",
                id: 69,
                sizeType: 0,
              },
              {
                upId: 68,
                Name: "Deux pièces",
                sizeType: 0,

                id: 70,
              },
            ],
          },

          {
            upId: 2,
            Name: "Autres vêtements",
            sizeType: 0,

            id: 72,
          },
        ],
      },
      {
        upId: 1,

        type: "list",
        id: 73,
        Name: "Chaussures",
        subitems: [
          {
            id: 74,
            Name: "Bottes",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 75,
            Name: "Bottines",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 76,
            Name: "Chaussures à talons",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 77,
            Name: "Chaussures plates",
            upId: 73,
            sizeType: 1,
          },

          {
            id: 78,
            Name: "Sneakers & Basket",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 79,
            Name: "Sandales",
            upId: 73,
            sizeType: 1,
          },

          {
            id: 80,
            Name: "Autres chaussures",
            upId: 73,
            sizeType: 1,
          },
        ],
      },
      {
        upId: 1,

        type: "list",
        Name: "Sacs",
        id: 81,
        subitems: [
          {
            Name: "Sacs à main",
            id: 82,
            upId: 81,
            sizeType: 2,
          },
          {
            Name: "Sacs en bandoulière",
            id: 83,
            upId: 81,
            sizeType: 2,
          },
          {
            Name: "Sacs à dos",
            id: 84,
            upId: 81,
            sizeType: 2,
          },
          {
            Name: "Pochette",
            id: 85,
            upId: 81,
            sizeType: 2,
          },
          {
            Name: "Sacs banane",
            id: 86,
            upId: 81,
            sizeType: 2,
          },
          {
            Name: "Sacs de sport",
            id: 87,
            upId: 81,
            sizeType: 2,
          },
          {
            Name: "Autres sacs",
            id: 88,
            upId: 81,
            sizeType: 2,
          },
        ],
      },
    ],
  },
  {
    id: 104,
    Name: "Homme",
    type: "list",
    number: "H",
    subitems: [
      {
        upId: 104,
        id: 105,
        Name: "Vêtements",
        type: "list",
        subitems: [
          {
            upId: 105,
            id: 106,
            type: "list",
            Name: "Jeans",
            subitems: [
              {
                upId: 106,
                id: 107,
                Name: "Jeans troués",
                sizeType: 0,
              },
              {
                upId: 106,
                id: 108,
                Name: "Jeans skinny",
                sizeType: 0,
              },
              {
                upId: 106,
                id: 109,
                Name: "Jeans slim",
                sizeType: 0,
              },
              {
                upId: 106,
                id: 110,
                Name: "Jeans coupes droites",
                sizeType: 0,
              },
            ],
          },
          {
            upId: 105,
            id: 111,
            type: "list",
            Name: "Manteaux & Vestes",
            subitems: [
              {
                upId: 111,
                id: 112,
                Name: "Manteaux",
                type: "list",
                subitems: [
                  {
                    upId: 112,
                    id: 113,
                    Name: "Imperméables",
                    sizeType: 0,
                  },
                  {
                    upId: 112,
                    id: 114,
                    Name: "Trench-coats",
                    sizeType: 0,
                  },
                  {
                    upId: 112,
                    id: 115,
                    Name: "Duffle-coats",
                    sizeType: 0,
                  },
                  {
                    upId: 112,
                    id: 116,
                    Name: "Cabans",
                    sizeType: 0,
                  },
                  {
                    upId: 112,
                    id: 117,
                    Name: "Parkas",
                    sizeType: 0,
                  },
                  {
                    upId: 112,
                    id: 118,
                    Name: "Manteaux en laine",
                    sizeType: 0,
                  },
                ],
              },
              {
                upId: 111,
                id: 119,
                Name: "Vestes",
                type: "list",
                subitems: [
                  {
                    upId: 119,
                    id: 120,
                    Name: "Vestes en jean",
                    sizeType: 0,
                  },
                  {
                    upId: 119,
                    id: 121,
                    Name: "Vestes en cuir",
                    sizeType: 0,
                  },
                  {
                    upId: 119,
                    id: 122,
                    Name: "Vestes légères",
                    sizeType: 0,
                  },
                  {
                    upId: 119,
                    id: 123,
                    Name: "Vestes harrington ",
                    sizeType: 0,
                  },
                  {
                    upId: 119,
                    id: 124,
                    Name: "Vestes en duvet",
                    sizeType: 0,
                  },
                  {
                    upId: 119,
                    id: 125,
                    Name: "Vestes polaires",
                    sizeType: 0,
                  },
                  {
                    upId: 119,
                    id: 126,
                    Name: "Autres",
                    sizeType: 0,
                  },
                ],
              },
            ],
          },
          {
            upId: 105,
            id: 127,
            Name: "Hauts & T-shirts",
            sizeType: 0,
          },
          {
            upId: 105,

            type: "list",
            Name: "Sweats & Pulls",

            id: 128,
            subitems: [
              {
                id: 200,
                type: "list",
                upId: 128,
                Name: "Sweats",
                subitems: [
                  {
                    id: 203,
                    sizeType: 0,
                    Name: "Sweats à capuche",
                    upId: 200,
                  },
                  {
                    id: 204,
                    Name: "Sweats longs",
                    upId: 200,
                    sizeType: 0,
                  },
                  {
                    id: 205,
                    Name: "Autres sweats",
                    upId: 200,
                    sizeType: 0,
                  },
                ],
              },
              {
                id: 201,
                type: "list",
                upId: 128,
                Name: "Pulls",
                subitems: [
                  {
                    id: 206,
                    Name: "Pulls d'hiver",
                    upId: 201,
                    sizeType: 0,
                  },
                  {
                    id: 207,
                    Name: "Pulls col V",
                    upId: 201,
                    sizeType: 0,
                  },
                  {
                    id: 208,
                    Name: "Pulls col roulé",
                    upId: 201,
                    sizeType: 0,
                  },
                ],
              },
              {
                id: 202,
                upId: 128,
                Name: "Autres Sweats & pull-overs",
              },
            ],
          },
          {
            upId: 105,
            id: 130,
            type: "list",
            Name: "Pantalons",
            subitems: [
              {
                upId: 130,
                id: 131,
                Name: "Jogging",
                sizeType: 0,
              },
              {
                upId: 130,
                id: 132,
                Name: "Pantalons skinny",
                sizeType: 0,
              },
              {
                upId: 130,
                id: 133,
                Name: "Pantacourts",
                sizeType: 0,
              },
              {
                upId: 130,
                id: 134,
                Name: "Pantalons de costume",
                sizeType: 0,
              },
              {
                upId: 130,
                id: 135,
                Name: "Pantalons à jambes larges",
                sizeType: 0,
              },
            ],
          },
          {
            upId: 105,
            id: 136,
            type: "list",
            Name: "Shorts",
            subitems: [
              {
                upId: 136,
                id: 137,
                Name: "Shorts cargo",
                sizeType: 0,
              },
              {
                upId: 136,
                id: 138,
                Name: "Shorts chino",
                sizeType: 0,
              },
              {
                upId: 136,
                id: 139,
                Name: "Shorts en jean",
                sizeType: 0,
              },
            ],
          },
          {
            upId: 105,
            id: 140,
            type: "list",
            Name: "Vêtements de sports",
            subitems: [
              {
                upId: 140,
                id: 141,
                Name: "Survêtements",
                sizeType: 0,
              },
              {
                upId: 140,
                id: 142,
                Name: "Shorts de sport",
                sizeType: 0,
              },
              {
                upId: 140,
                id: 143,
                Name: "Hauts & T-shirts",
                sizeType: 0,
              },
            ],
          },
          {
            upId: 105,
            id: 144,
            Name: "Maillots de bain ",
            sizeType: 0,
          },
          {
            upId: 105,
            id: 145,
            type: "list",
            Name: "Autres vêtements",
            sizeType: 0,
          },
        ],
      },
      {
        upId: 104,
        id: 146,
        type: "list",
        Name: "Chaussures",
        number: 2,
        subitems: [
          {
            upId: 146,
            id: 147,
            type: "list",
            Name: "Chaussons et Tongs",
            sizeType: 1,
          },
          {
            upId: 146,
            id: 149,
            type: "list",
            Name: "Sneakers et converses",
            sizeType: 1,
          },
          {
            upId: 146,
            id: 150,
            type: "list",
            Name: "Chaussures de sport",
            sizeType: 1,
          },
          {
            upId: 146,
            id: 151,
            type: "list",
            Name: "Sandales",
            sizeType: 1,
          },
          {
            upId: 146,
            id: 152,
            type: "list",
            Name: "Bottes et boots",
            sizeType: 1,
          },
          {
            upId: 146,
            id: 153,
            Name: "Autres chaussures",
            sizeType: 1,
            selectId: 2,
          },
        ],
      },
      {
        upId: 104,
        Name: "Sacs et sacoches",
        id: 168,
        selectId: 2,
        subitems: [
          {
            id: 170,
            upId: 168,
            Name: "Sacs en bandoulière",
            sizeType: 2,
          },
          {
            id: 171,
            upId: 168,
            Name: "Sacs à dos",
            sizeType: 2,
          },
          {
            id: 172,
            upId: 168,
            Name: "Sacs banane",
            sizeType: 2,
          },
          {
            id: 173,
            upId: 168,
            Name: "Autres",
            sizeType: 2,
          },
        ],
      },
    ],
  },
];

export const arraySize = [
  {
    id: "Femme",
    idNavigation: 1,
    Name: "Femme",
    type: "list",
    subitems: [
      {
        id: 1,
        Name: "Taille",
        subitems: [
          {
            Name: "XS / 34",
            id: "XS / 34",
          },
          {
            Name: "S / 36",
            id: "S / 36",
          },
          {
            Name: "M / 38",
            id: "M / 38",
          },
          {
            Name: "L / 40",
            id: "L / 40",
          },
          {
            Name: "Xl / 42",
            id: "Xl / 42",
          },
          {
            Name: "Autres",
            id: "Autres",
          },
        ],
      },
      {
        id: 2,
        Name: "Chaussures",

        subitems: [
          {
            Name: "35",
            plain: true,
            id: "35",
          },
          {
            Name: "36",
            plain: true,
            id: "36",
          },
          {
            Name: "37",
            plain: true,
            id: "37",
          },
          {
            Name: "38",
            plain: true,
            id: "38",
          },
          {
            Name: "39",
            plain: true,
            id: "39",
          },
          {
            Name: "40",
            plain: true,
            id: "40",
          },
          {
            Name: "41",
            plain: true,
            id: "41",
          },
          {
            Name: "42",
            plain: true,
            id: "42",
          },
          {
            Name: "43",
            plain: true,
            id: "43",
          },
          {
            Name: "35.5",
            id: "35.5",
          },
          {
            Name: "36.5",
            id: "36.5",
          },
          {
            Name: "37.5",
            id: "37.5",
          },
          {
            Name: "38.5",
            id: "38.5",
          },
          {
            Name: "39.5",
            id: "39.5",
          },
          {
            Name: "40.5",
            id: "40.5",
          },

          {
            Name: "Autres",
            id: "Autres",
          },
        ],
      },
      {
        id: 3,
        Name: "sac",
        subitems: [
          {
            Name: "grand",
            plain: true,
            id: "grand",
          },
          {
            Name: "petit",
            id: "petit",
            plain: true,
          },
        ],
      },
    ],
  },
  {
    Name: "Homme",
    type: "list",
    id: 104,

    subitems: [
      {
        id: 1,
        subitems: [
          {
            Name: "XS / 34",
            id: "XS / 34",
          },
          {
            Name: "S / 36",
            id: "S / 36",
          },
          {
            Name: "M / 38",
            id: "M / 38",
          },
          {
            Name: "L / 40",
            id: "L / 40",
          },
          {
            Name: "XL / 42",
            id: "XL / 42",
          },
          {
            Name: "XXL",
            id: "XXl",
          },
          {
            Name: "Oversized",
            id: "Oversized",
          },
          {
            Name: "Autres",
            id: "Autres",
          },
        ],
      },
      {
        id: 2,

        Name: "Chaussures",

        subitems: [
          {
            Name: "36",
            id: "36",
            plain: true,
          },
          {
            Name: "37",
            id: "37",
            plain: true,
          },
          {
            Name: "38",
            id: "38",
            plain: true,
          },
          {
            Name: "39",
            id: "39",

            plain: true,
          },
          {
            Name: "40",
            id: "40",
            plain: true,
          },
          {
            Name: "41",
            id: "41",
            plain: true,
          },
          {
            Name: "42",
            id: "42",
            plain: true,
          },
          {
            Name: "43",
            id: "43",
            plain: true,
          },
          {
            Name: "44",
            id: "44",
            plain: true,
          },
          {
            Name: "45",
            id: "45",
            plain: true,
          },
          {
            Name: "46",
            id: "46",
            plain: true,
          },

          {
            Name: "36.5",
            id: "36.5",
          },
          {
            Name: "37.5",
            id: "37.5",
          },
          {
            Name: "38.5",
            id: "38.5",
          },
          {
            Name: "39.5",
            id: "39.5",
          },
          {
            Name: "40.5",
            id: "40.5",
          },
          {
            Name: "41.5",
            id: "41.5",
          },
          {
            Name: "42.5",
            id: "42.5",
          },
          {
            Name: "43.5",
            id: "43.5",
          },
          {
            Name: "44.5",
            id: "44.5",
          },
          {
            Name: "45.5",
            id: "45.5",
          },
          {
            Name: "46.5",
            id: "46.5",
          },

          {
            Name: "Autres",
            id: "Autres",
          },
        ],
      },
    ],
  },
];

export const listCategorie = (
  id = null,
  rank = null,
  setNavigationValue,
  classes,
  setcurrentItem,
  SelectableItem,
  setSize,
  mobile,
  setCa
) => {
  switch (rank.length) {
    case 0:
      return Catalogue.map((item) => {
        return (
          <Box width={"100%"} overflow="hidden">
            <MenuItem
              className={classes.BoxItem}
              disableFocusRipple
              disableTouchRipple
              onClick={(e) => {
                if (item.id === 1) {
                  setSize([0]);
                }
                if (item.id === 104) {
                  setSize([1]);
                }

                setNavigationValue([
                  ...rank,
                  { upId: item.Name, id: 0, array: item.subitems },
                ]);
              }}
            >
              {item.Name}
              <IconButton
                className={classes.Arrow}
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                <ChevronRightIcon style={{ fontSize: 25 }} />{" "}
              </IconButton>
            </MenuItem>
            <Divider />
          </Box>
        );
      });
    case 1:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );

    case 2:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );

    case 3:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );

    case 4:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );
    default:
      return 0;
  }
};

export const renderArraySize = (size, selection) => {
  switch (selection) {
    case 1:
      return size[0].subitems[1].subitems;

    case 2:
      return size[0].subitems[0].subitems;

    case 3:
      return size[1].subitems[1].subitems;

    case "HC":
      return size[1].subitems[0].subitems;

    default:
      return size;
  }
};
