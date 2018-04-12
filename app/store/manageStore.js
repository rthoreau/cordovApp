const state = {
  currentMusic: 'ze7857586',
  waitingLine: ['5er84t568e', 'ert5784ert'],
  musics: [
    {id: 'ze7857586', url: 'https://www.youtube.com/watch?v=rVeMiVU77wo', title: 'alt-J (∆) Breezeblocks', author: 'alt-J', date: '2012-03-23', duration: '226', thumbnail: 'http://www.konbini.com/wp-content/blogs.dir/3/files/2012/06/Alt-j-Breezeblocks-480x279.jpg', plateform: 'lo', favorite: true},
    {id: 'z7281z6', url: 'https://www.youtube.com/watch?v=mEBrRSa7BaM', title: 'Klangnomad - Promo 2013', author: 'Klangnomad Music', date: '2013-08-09', duration: '2916', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2uL93WD0W8J_S1aLlE_cZVBxJ89RGQD4JvB8zZotXE7XvvW7v', plateform: 'yt', favorite: true},
     {id: '5er84t568e', url: 'https://www.youtube.com/watch?v=pliDsyfUXcg', title: 'Indie Indie Folk - Summer 2015 Tracklist Included', author: 'Fernando Bueno', date: '2015-07-18', duration: '6949', thumbnail: 'https://i9.ytimg.com/sb/ZwBkXgWNs_M/storyboard3_L2/M0.jpg?sigh=rs%24AOn4CLBUyfI7x8IRqXF_2NdPeIb3UX8tKw', plateform: 'yt', favorite: false},
    {id: 'ert54e', url: 'https://www.youtube.com/watch?v=x_X6QrPM_O8', title: "Payne's Bay", author: 'Polskimg', date: '2011-07-15', duration: '228', thumbnail: 'http://images.genius.com/1d8c6ddea011aa89d7cdbeef8a78e0eb.1000x1000x1.jpg', plateform: 'yt', favorite: true},
    {id: 'ze5750785z6', url: 'https://www.youtube.com/watch?v=D6TawVna7PQ', title: 'ESCAPE - A Beautiful Chill Mix', author: 'Pulse8', date: '2017-12-14', duration: '6183', thumbnail: 'https://i.ytimg.com/vi/D6TawVna7PQ/maxresdefault.jpg', plateform: 'sp', favorite: true},
    {id: 'a65468e468v4', url: 'https://www.youtube.com/watch?v=wYNAZz86DVo', title: 'C418 - One [full album] (2012)', author: '2nMusic', date: '2013-02-12', duration: '5743', thumbnail: 'https://f4.bcbits.com/img/a1911559443_10.jpg', plateform: 'lo', favorite: true},
    {id: 'ert5784ert', url: 'https://www.youtube.com/watch?v=6KKKGpAZHAA', title: 'OVERWERK - Daybreak', author: 'EMH Music', date: '2012-10-17', duration: '304', thumbnail: 'https://i.ytimg.com/vi/6KKKGpAZHAA/maxresdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'bertertb', url: 'https://www.youtube.com/watch?v=umjMGZw6vtw', title: 'Yann Tiersen - "La valse des Monstres" (full Album)', author: 'srtanada08', date: '2013-08-18', duration: '2642', thumbnail: 'http://www.kaltblut-magazine.com/wp-content/uploads/2014/08/yann-tiersen-4df4cdfab01e1-720x385.jpg', plateform: 'yt', favorite: false},
    {id: '8ea4zv168', url: 'https://www.youtube.com/watch?v=HJzp2SRs0Ak', title: 'Agnes Obel - Dorian', author: 'AgnesObelVEVO', date: '2013-11-10', duration: '341', thumbnail: 'https://i.ytimg.com/vi/HJzp2SRs0Ak/maxresdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'zertert6', url: 'https://www.youtube.com/watch?v=RXiRpiOcWWI', title: 'Beirut - Port Of Call', author: 'candypoulaink', date: '2011-08-06', duration: '259', thumbnail: 'https://i.ytimg.com/vi/RXiRpiOcWWI/maxresdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'azdedbgyu', url: 'https://www.youtube.com/watch?v=Z5BuZQGoJF4', title: 'Beirut - Cherbourg', author: 'Pulse8', date: '2017-12-14', duration: '211', thumbnail: 'https://i.ytimg.com/vi/Z5BuZQGoJF4/hqdefault.jpg', plateform: 'sp', favorite: true},
    {id: 'stlkapml', url: 'https://www.youtube.com/watch?v=RCMXO9sBIcU', title: '"Everdream" by Epic Soul Factory', author: 'HDSounDI', date: '2016-04-15', duration: '509', thumbnail: 'https://i.ytimg.com/vi/vKauAsFACyE/maxresdefault.jpg', plateform: 'sp', favorite: false}
  ],
  playlists: [
    {id: '14', name: 'Sleep', musics: ['5er84t568e', 'azdedbgyu']},
    {id: '22', name: 'Test', musics: ['bertertb', 'a65468e468v4', 'stlkapml']}
  ],
  searchResult: [
    {id: 'ert54e', url: 'https://www.youtube.com/watch?v=umjMGZw6vtw', title: 'Yann Tiersen - "La valse de Monstres" (full Album)', author: 'srtanada08', date: '2013-08-18', duration: '2642', thumbnail: 'http://www.kaltblut-magazine.com/wp-content/uploads/2014/08/yann-tiersen-4df4cdfab01e1-720x385.jpg', plateform: 'yt', favorite: true},
    {id: 'ze5750785z6', url: 'https://www.youtube.com/watch?v=D6TawVna7PQ', title: 'ESCAPE - A Beautiful Chill Mix', author: 'Pulse8', date: '2017-12-14', duration: '6183', thumbnail: 'https://i9.ytimg.com/sb/D6TawVna7PQ/storyboard3_L1/M2.jpg?sigh=rs%24AOn4CLDmljK3QQnUIad1F1p0KD8x3zZL_w', plateform: 'sp', favorite: false},
    {id: 'a65468e468v4', url: 'https://www.youtube.com/watch?v=wYNAZz86DVo', title: 'C418 - One [full album] (2012)', author: '2nMusic', date: '2013-02-12', duration: '5743', thumbnail: 'https://f4.bcbits.com/img/a1911559443_10.jpg', plateform: 'yt', favorite: false},
    {id: 'ert5784ert', url: 'https://www.youtube.com/watch?v=pliDsyfUXcg', title: 'Indie Indie Folk - Summer 2015 Tracklist Included', author: 'Fernando Bueno', date: '2015-07-18', duration: '6949', thumbnail: 'https://i9.ytimg.com/sb/ZwBkXgWNs_M/storyboard3_L2/M0.jpg?sigh=rs%24AOn4CLBUyfI7x8IRqXF_2NdPeIb3UX8tKw', plateform: 'yt', favorite: true},
    {id: 'stlkapml', url: 'https://www.youtube.com/watch?v=RCMXO9sBIcU', title: '"Everdream" by Epic Soul Factory', author: 'HDSounDI', date: '2016-04-15', duration: '509', thumbnail: 'https://i.ytimg.com/vi/vKauAsFACyE/maxresdefault.jpg', plateform: 'sp', favorite: false}

  ]
}

const getters = {
  getCurrentMusic: state => state.musics.filter(music => music.id === state.currentMusic)[0],
  getMusics: state => state.musics,
  getMusic: function (state) {
    return function (id) {
      return state.musics.filter(music => music.id === id)[0];
    };
  },
  getPlaylists: state => state.playlists,
  getPlaylist: function (state) {
    return function (id) {
      var playlist = state.playlists.filter(playlist => playlist.id === id);
      return playlist.length ? playlist[0] : {id: id, name: '', musics: []};
    };
  },
  getFavorites: state => state.musics.filter(music => music.favorite),
  getSearchResult: function (state) {
    return function () {
      var fromMusic = [];
      var mergedResult = state.searchResult;
      mergedResult.map(function (music) {
        //Get information if music exist and is favorited
        fromMusic = state.musics.filter(storedMusic => music.id === storedMusic.id);
        if (fromMusic.length === 1 && fromMusic[0].favorite) {
          music.favorite = true;
        } else {
          music.favorite = false;
        }
        return music;
      });
      return state.searchResult;
    }
  },
  getWaitingLine: state => state.waitingLine
}

const mutations = {
  mutateCurrentMusic: (state, currentMusic) => {
    state.currentMusic = currentMusic;
  },
  mutatePlaylists: (state, playlists) => {
    state.playlists = playlists;
  },
  mutateWaitingLing: (state, waitingLine) => {
    state.waitingLine = waitingLine;
  },
  mutateDeletePlaylist: (state, playlistId) => {
    state.playlists = state.playlists.filter(playlist => playlist.id !== playlistId);
  },
  /**
   * params:
   * - action : add/remove
   * - to : favorite/playlist
   * - from favorite/playlist
   * - source search/''
   */
  mutateMusic: (state, params) => {
    var needFilter = false;
    var created = false;
    if (params.action === 'add') {
      //if call from search, add music if not in state.musics
      if (params.source === 'search' && state.musics.filter(music => music.id === params.music.id).length === 0) {
        if (params.to === 'favorite') {
          params.music.favorite = true;
        }
        state.musics.push(params.music);
        created = true;
      }
      if (params.to === 'playlist') {
        state.playlists.map(function (playlist) {
          if (params.playlistIds.indexOf(playlist.id) !== -1) {
            playlist.musics.push(params.musicId);
          }
          return playlist;
        });
      } else if (params.to === 'favorite' && !created) {
        state.musics.map(function (music) {
          if (music.id === params.musicId) {
            music.favorite = !music.favorite;
            if (!music.favorite) {
              needFilter = true;
              params.ids = [params.musicId];
            }
          }
          return music;
        });
      }
    }
    if (needFilter || params.action === 'remove') {
      var usedIds = [];
      if (params.from === 'favorite') {
        //Change .favorite from ids in params.ids
        state.musics.map(function (music) {
          if (params.ids.indexOf(music.id) !== -1) {
            music.favorite = false;
          }
          return music;
        });
      } else {
        //List ids from params.ids that are favorite.length);
        params.ids.forEach(function (id) {
          if (state.musics.filter(music => music.id === id && music.favorite === true).length > 0 && usedIds.indexOf(id) === -1) {
            usedIds.push(id);
          }
        });
      }
      if (params.from === 'playlist') {
        //Only filter array in params.playlistId
        state.playlists.map(function (playlist) {
          if (parseInt(playlist.id) === params.playlistId) {
            //Keep only ids not in array
            playlist.musics = playlist.musics.filter(id => params.ids.indexOf(id) === -1);
          }
          return playlist;
        });
      } else {
        //List ids from params.ids that are in at least one playlist
        var i = 0;
        //Check in all playlists
        state.playlists.forEach(function (playlist) {
          //while there are ids and are not all used
          i = 0;
          while (i <= params.ids.length && usedIds.length !== params.ids.length) {
            if (playlist.musics.indexOf(params.ids[i]) !== -1 && usedIds.indexOf(params.ids[i]) === -1) {
              usedIds.push(params.ids[i]);
            }
            i++;
          }
        });
      }

      //Keep musics that are favorite or in a playlist
      if (params.ids.length !== usedIds.length) {
        //Keep ids not in params.ids or that are used
        state.musics = state.musics.filter(music => params.ids.indexOf(music.id) === -1 || usedIds.indexOf(music.id) !== -1 || music.id === state.currentMusic);
      }
    }
    console.log(state.musics);
  }
}

//tester filterMusic et AddMusic from = search
const actions = {
  setCurrentMusic (context, currentMusic) {
    context.commit('mutateCurrentMusic', currentMusic)
  },
  setPlaylists (context, playlists) {
    context.commit('mutatePlaylists', playlists)
  },
  setWaitingLine (context, waitingLine) {
    context.commit('mutateWaitingLine', waitingLine)
  },
  deletePlaylist (context, playlist) {
    //filter musics before removal
    context.commit('mutateMusic', {action: 'remove', ids: playlist.musics})
    context.commit('mutateDeletePlaylist', playlist.id)
  },
  musicAction (context, params) {
    params.to = params.to ? params.to : 'playlist';
    params.from = params.from ? params.from : '';
    context.commit('mutateMusic', params)
  }
}

export default {namespaced: true, state, getters, mutations, actions}
