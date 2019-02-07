
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {
          id: 1,
          author: 'Chris Barbalis',
          link: 'https://images.unsplash.com/photo-1483829686443-863c1684ddad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1444&q=80',
          description: 'Wall Street Art in a public place'
        },
        {
          id: 2,
          author: 'Hugo Jehanne',
          link: 'https://images.unsplash.com/photo-1517607908060-9a66da662869?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          description: 'Roadtrip Switzerland'
        },
        {
          id: 3,
          author: 'Chris Holgersson',
          link: 'https://images.unsplash.com/photo-1549128584-3e199cb2db4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          description: "Feels like you are on that 80's grid every day when on the road.  This was gor our label VANTALE.  We drove through Spain and Portugal for over 6 weeks in our VW T5 Camper-Van"
        }
      ]);
    });
};
