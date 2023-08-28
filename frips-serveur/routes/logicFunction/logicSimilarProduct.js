const { PrismaClient } = require("@prisma/client");

const { item, category } = new PrismaClient();

const filterCatalogue = (Catalogue) => {
  return {
    item_category: {
      some: {
        OR: [
          {
            id_Category: {
              in: Catalogue,
            },
          },
          {
            category: {
              OR: [
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              id_Parent: {
                                in: Catalogue,
                              },
                            },
                          },
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      id_Parent: {
                        in: Catalogue,
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              category_categoryTocategory_category_id_Parent: {
                                category_category_categoryTocategory_category_id_Child:
                                  {
                                    some: {
                                      id_Parent: {
                                        in: Catalogue,
                                      },
                                    },
                                  },
                              },
                            },
                          },
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              category_categoryTocategory_category_id_Parent: {
                                category_category_categoryTocategory_category_id_Child:
                                  {
                                    some: {
                                      category_categoryTocategory_category_id_Parent:
                                        {
                                          category_category_categoryTocategory_category_id_Child:
                                            {
                                              some: {
                                                id_Parent: {
                                                  in: Catalogue,
                                                },
                                              },
                                            },
                                        },
                                    },
                                  },
                              },
                            },
                          },
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };
};
const similarProduct = async (id, category_id) => {
  const [category_category_categoryTocategory_category_id_Child] =
    await category.findMany({
      where: {
        id: category_id,
      },
      select: {
        category_category_categoryTocategory_category_id_Child: {
          select: {
            id_Parent: true,
          },
        },
      },
    });

  const similarArrayItem = await item.findMany({
    where: {
      AND: [
        filterCatalogue([
          category_id,
          category_category_categoryTocategory_category_id_Child
            .category_category_categoryTocategory_category_id_Child[0]
            .id_Parent,
        ]),
        {
          transaction: {
            none: {},
          },
        },
      ],
    },

    orderBy: [{ nbview: { _count: "desc" } }, { favorit: { _count: "desc" } }],

    select: {
      image: {
        take: 1,
      },

      Price: true,

      item_brand: {
        select: {
          brand: {
            select: {
              Name: true,
            },
          },
        },
      },
      item_category: {
        select: {
          category: {
            select: {
              Name: true,
              id: true,
            },
          },
        },
      },

      _count: {
        select: {
          favorit: true,
        },
      },
      id: true,
      account: {
        select: {
          Pseudo: true,
          image: {
            select: {
              image: true,
            },
          },
          id: true,
        },
      },
    },
  });
  return similarArrayItem.sort((a) => {
    return a.item_category[0].category.id === category_id ? -1 : 1;
  });
};

module.exports = {
  similarProduct,
};
