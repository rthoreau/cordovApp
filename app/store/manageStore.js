const state = {
  currentMusic: 'loaoijfaa3',
  waitingLine: ['5er84t568e', 'ert5784ert'],
  musics: [
    {id: 'ze7857586', url: 'https://www.youtube.com/watch?v=rVeMiVU77wo', title: 'alt-J (∆) Breezeblocks', author: 'alt-J', date: '2012-03-23', duration: '226', thumbnail: 'http://www.konbini.com/wp-content/blogs.dir/3/files/2012/06/Alt-j-Breezeblocks-480x279.jpg', plateform: 'yt', favorite: true},
    {id: 'z7281z6', url: 'https://www.youtube.com/watch?v=mEBrRSa7BaM', title: 'Klangnomad - Promo 2013', author: 'Klangnomad Music', date: '2013-08-09', duration: '2916', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2uL93WD0W8J_S1aLlE_cZVBxJ89RGQD4JvB8zZotXE7XvvW7v', plateform: 'yt', favorite: true},
     {id: '5er84t568e', url: 'https://www.youtube.com/watch?v=pliDsyfUXcg', title: 'Indie Indie Folk - Summer 2015 Tracklist Included', author: 'Fernando Bueno', date: '2015-07-18', duration: '6949', thumbnail: 'https://i9.ytimg.com/sb/ZwBkXgWNs_M/storyboard3_L2/M0.jpg?sigh=rs%24AOn4CLBUyfI7x8IRqXF_2NdPeIb3UX8tKw', plateform: 'yt', favorite: false},
    {id: 'ert54e', url: 'https://www.youtube.com/watch?v=x_X6QrPM_O8', title: "Payne's Bay", author: 'Polskimg', date: '2011-07-15', duration: '228', thumbnail: 'http://images.genius.com/1d8c6ddea011aa89d7cdbeef8a78e0eb.1000x1000x1.jpg', plateform: 'yt', favorite: true},
    {id: 'ze5750785z6', url: 'https://www.youtube.com/watch?v=D6TawVna7PQ', title: 'ESCAPE - A Beautiful Chill Mix', author: 'Pulse8', date: '2017-12-14', duration: '6183', thumbnail: 'https://i.ytimg.com/vi/D6TawVna7PQ/maxresdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'a65468e468v4', url: 'https://www.youtube.com/watch?v=wYNAZz86DVo', title: 'C418 - One [full album] (2012)', author: '2nMusic', date: '2013-02-12', duration: '5743', thumbnail: 'https://f4.bcbits.com/img/a1911559443_10.jpg', plateform: 'yt', favorite: true},
    {id: 'ert5784ert', url: 'https://www.youtube.com/watch?v=6KKKGpAZHAA', title: 'OVERWERK - Daybreak', author: 'EMH Music', date: '2012-10-17', duration: '304', thumbnail: 'https://i.ytimg.com/vi/6KKKGpAZHAA/maxresdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'bertertb', url: 'https://www.youtube.com/watch?v=umjMGZw6vtw', title: 'Yann Tiersen - "La valse des Monstres" (full Album)', author: 'srtanada08', date: '2013-08-18', duration: '2642', thumbnail: 'http://www.kaltblut-magazine.com/wp-content/uploads/2014/08/yann-tiersen-4df4cdfab01e1-720x385.jpg', plateform: 'yt', favorite: false},
    {id: '8ea4zv168', url: 'https://www.youtube.com/watch?v=HJzp2SRs0Ak', title: 'Agnes Obel - Dorian', author: 'AgnesObelVEVO', date: '2013-11-10', duration: '341', thumbnail: 'https://i.ytimg.com/vi/HJzp2SRs0Ak/maxresdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'zertert6', url: 'https://www.youtube.com/watch?v=RXiRpiOcWWI', title: 'Beirut - Port Of Call', author: 'candypoulaink', date: '2011-08-06', duration: '259', thumbnail: 'https://i.ytimg.com/vi/RXiRpiOcWWI/maxresdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'azdedbgyu', url: 'https://www.youtube.com/watch?v=Z5BuZQGoJF4', title: 'Beirut - Cherbourg', author: 'Pulse8', date: '2017-12-14', duration: '211', thumbnail: 'https://i.ytimg.com/vi/Z5BuZQGoJF4/hqdefault.jpg', plateform: 'yt', favorite: true},
    {id: 'stlkapml', url: 'https://www.youtube.com/watch?v=RCMXO9sBIcU', title: '"Everdream" by Epic Soul Factory', author: 'HDSounDI', date: '2016-04-15', duration: '509', thumbnail: 'https://i.ytimg.com/vi/vKauAsFACyE/maxresdefault.jpg', plateform: 'yt', favorite: false},
    {id: 'loaoijfaa3', url: '../assets/test.mp3', title: 'SKARBLOWN MUSIC - 03_PALE SUNSHINE', author: '', date: '', duration: 0, thumbnail: 'https://i.ytimg.com/vi/4QmaOYg_jRA/maxresdefault.jpg', plateform: 'lo', favorite: true}
  ],
  playlists: [
    {id: '14', name: 'Sleep', musics: ['5er84t568e', 'azdedbgyu']},
    {id: '22', name: 'Test', musics: ['bertertb', 'a65468e468v4', 'stlkapml']}
  ],
  searchResult: [
    {id: 'ert54e', url: 'https://www.youtube.com/watch?v=umjMGZw6vtw', title: 'Yann Tiersen - "La valse de Monstres" (full Album)', author: 'srtanada08', date: '2013-08-18', duration: '2642', thumbnail: 'http://www.kaltblut-magazine.com/wp-content/uploads/2014/08/yann-tiersen-4df4cdfab01e1-720x385.jpg', plateform: 'yt', favorite: true},
    {id: 'ze5750785z6', url: 'https://www.youtube.com/watch?v=D6TawVna7PQ', title: 'ESCAPE - A Beautiful Chill Mix', author: 'Pulse8', date: '2017-12-14', duration: '6183', thumbnail: 'https://i9.ytimg.com/sb/D6TawVna7PQ/storyboard3_L1/M2.jpg?sigh=rs%24AOn4CLDmljK3QQnUIad1F1p0KD8x3zZL_w', plateform: 'yt', favorite: false},
    {id: 'a65468e468v4', url: 'https://www.youtube.com/watch?v=wYNAZz86DVo', title: 'C418 - One [full album] (2012)', author: '2nMusic', date: '2013-02-12', duration: '5743', thumbnail: 'https://f4.bcbits.com/img/a1911559443_10.jpg', plateform: 'yt', favorite: false},
    {id: 'ert5784ert', url: 'https://www.youtube.com/watch?v=pliDsyfUXcg', title: 'Indie Indie Folk - Summer 2015 Tracklist Included', author: 'Fernando Bueno', date: '2015-07-18', duration: '6949', thumbnail: 'https://i9.ytimg.com/sb/ZwBkXgWNs_M/storyboard3_L2/M0.jpg?sigh=rs%24AOn4CLBUyfI7x8IRqXF_2NdPeIb3UX8tKw', plateform: 'yt', favorite: true},
    {id: 'stlkapml', url: 'https://www.youtube.com/watch?v=RCMXO9sBIcU', title: '"Everdream" by Epic Soul Factory', author: 'HDSounDI', date: '2016-04-15', duration: '509', thumbnail: 'https://i.ytimg.com/vi/vKauAsFACyE/maxresdefault.jpg', plateform: 'yt', favorite: false}
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
  mutatePlaylist: (state, playlist) => {
    var exists = false;
    state.playlists.map(function (pl) {
      if (pl.id === playlist.id) {
        pl = playlist;
        exists = true
      }
      return playlist;
    });
    if (!exists) {
      state.playlists.push(playlist);
    }
  },
  mutateDeletePlaylist: (state, playlistId) => {
    state.playlists = state.playlists.filter(playlist => playlist.id !== playlistId);
  },
  mutateFilterMusics: (state, params) => {
    var keepIds = [];

    //get ids in playlists
    state.playlists.map(function (playlist) {
      playlist.musics.forEach(id => keepIds.push(id));
    });

    //get id in waitingline
    state.waitingLine.map(id => keepIds.push(id));

    //get ids favorite
    if (params.from !== 'favorite') {
      state.musics.map(function (music) {
        if (music.favorite) {
          keepIds.push(music.id);
        }
      })
    }

    //get current
    keepIds.push(state.currentMusic);

    //keep disinct
    keepIds.filter((value, index, self) => self.indexOf(value) === index);

    //if less musics to keep than stored musics, filter stored musics
    if (keepIds.length !== state.musics.length) {
      state.musics.filter(music => keepIds.indexOf(music.id) !== -1);
    }
  },
  mutateAddMusic: (state, params) => {
    var created = false;
    //if call from search, add music if not exists
    if (params.source === 'search' && state.musics.filter(music => music.id === params.music.id).length === 0) {
      if (params.to === 'favorite') {
        params.music.favorite = true;
      }
      state.musics.push(params.music);
      created = true;
    }

    if (params.to === 'playlist') {
      //add to playlist
      params.playlistIds = params.playlistId ? [params.playlistId] : params.playlistIds;
      state.playlists.map(function (playlist) {
        if (params.playlistIds.indexOf(playlist.id) !== -1) {
          if (params.id) {
            playlist.musics.push(params.id);
          } else {
            console.log('missing arg, add what ?')
          }
        }
        return playlist;
      });
    } else if (params.to === 'waitingLine') {
      if (params.ids) {
        if (params.from === 'playlist') {
          //add all playlist at end
          params.ids.forEach(id => state.waitingLine.push(id));
        } else {
          //add playlist (-1) at start
          params.ids.forEach(id => state.waitingLine.unshift(id));
        }
      } else {
        //else add to end
        state.waitingLine.push(params.id);
      }
    } else if (params.to === 'favorite' && !created) {
      //add to playlist if not created
      state.musics.map(function (music) {
        if (music.id === params.id) {
          music.favorite = true;
        }
        return music;
      });
    } else if (params.to === 'current') {
      state.currentMusic = params.id;
    } else {
      console.log('missing arg, add to ?')
    }
  },
  mutateRemoveMusic: (state, params) => {
    if (params.from === 'playlist') {
      state.playlists.map(function (playlist) {
        //from playlist where playlistID
        if (playlist.id === params.playlistId.toString()) {
          if (params.index) {
            //delete at pos (can't delete with id cause maybe 2 time same music)
            playlist.musics = playlist.musics.filter((id, index) => index !== params.index);
          } else if (params.all) {
            //or empty musics
            playlist.musics = [];
          } else {
            console.log('missing arg, remove what ?')
          }
        }
        return playlist;
      });
    } else if (params.from === 'waitingLine') {
      if (params.all) {
        //empty waitingline
        state.waitingLine = [];
      } else {
        //remove from waitingline at index
        state.waitingLine = state.waitingLine.filter((id, index) => index !== params.index);
      }
    } else if (params.from === 'favorite') {
      //set favorite false
      state.musics.map(function (music) {
        if (music.id === params.id) {
          music.favorite = false;
        }
        return music;
      });
    } else {
      console.log('missing arg, remove from ?')
    }
  },
  mutateRandomizeMusics: (state, params) => {
    var j
    var x
    var i
    var a = state.waitingLine;
    if (params.from === 'waitingLine') {
      a = state.waitingLine
      state.waitingLine = [];
    } else if (params.to === 'waitingLine') {
      a = [...params.ids]
    }

    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    if (params.to === 'waitingLine') {
      state.currentMusic = a.pop();
    }

    a.map(function (id) {
      if (params.from === 'waitingLine') {
        state.waitingLine.push(id);
      } else if (params.to === 'waitingLine') {
        state.waitingLine.unshift(id);
      }
    })
  },
  mutateMusic: (state, params) => {
    state.musics.map(function (music) {
      if (params.id === music.id) {
        console.log('mutateMusic')
        if (music.duration === 0 && params.duration) {
          music.duration = params.duration;
          console.log(music)
        }
      }
      return music;
    })
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
  setPlaylist (context, playlist) {
    context.commit('mutatePlaylist', playlist)
  },
  deletePlaylist (context, playlist) {
    context.commit('mutateDeletePlaylist', playlist.id)
  },
  setMusic (context, params) {
    context.commit('mutateMusic', params)
  },
  /*
    .action = add/remove/randomize
    .to/.from = 'playlist/waitingline/favorite'
    .id = int/''
    .ids = [int, int...]/''
    .all = true/'' from playlist/waitingLine
    .index = remove from position in playlist/waitingline
    .playlistId = from/to playlist concerned
    .playlistIds = to playlists concerned
    .source = search/'' for search page
    .music = {id:'', url...}/'' for search page
  */
  musicAction (context, params) {
    if (params.action === 'add') {
      context.commit('mutateAddMusic', params)
    } else if (params.action === 'remove') {
      context.commit('mutateRemoveMusic', params)
      context.commit('mutateFilterMusics', params)
    } else if (params.action === 'randomize') {
      context.commit('mutateRandomizeMusics', params)
    } else if (params.action === 'filter') {
      context.commit('mutateFilterMusics', params)
    } else {
      console.log('missing arg, do what ?')
    }
  }
}

export default {namespaced: true, state, getters, mutations, actions}
