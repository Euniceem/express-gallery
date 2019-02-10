
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {
          id: 1,
          author: 'Sylwia Bartyzel',
          title: 'Taj Mahal, Agra, India',
          link: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80',
          description: 'What is widely considered as the most beautiful building in the world, Taj Mahal is located in the historical city of Agra. Called as the "symbol of love", it was built by the Mughal Emperor Shah Jahan as a memorial for his third wife, Mumtaz Mahal. Every year visitors numbering more than the entire population of Agra passes through the magnificent gates to catch a glimpse of this breathtaking monument, and only a few leave disappointed.',
        },
        {
          id: 2,
          author: 'Hugo Jehanne',
          title: 'Roadtrip Switzerland',
          link: 'https://images.unsplash.com/photo-1517607908060-9a66da662869?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          description: 'Best roadtrip ever!'
        },
        {
          id: 3,
          author: 'Chris Holgersson',
          title: 'Vantale Roadtrip',
          link: 'https://images.unsplash.com/photo-1549128584-3e199cb2db4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
          description: "Feels like you are on that 80's grid every day when on the road.  This was gor our label VANTALE.  We drove through Spain and Portugal for over 6 weeks in our VW T5 Camper-Van"
        },
        {
          id: 4,
          author: 'Pietro De Grandi',
          title: 'Boat Journey',
          link: 'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          description: 'In summer, lake Lago di Braies in South Tyrol reflects colours in all shades from green to blue, in winter Lago di Braies is covered with ice and snow. In winter and summer this jewel is the starting point for hikes, ski tours, snowshoe hikes and walks. Nordic Walkers are also very well catered for. '
        }
      ]);
    });
};
