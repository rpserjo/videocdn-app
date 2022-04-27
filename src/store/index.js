import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    api : {
      protocol : 'https:',
      host : '//**.**',      
      token : '****'
    },
    bookmarks: [],
    bookmarksResult: {},
    current : {
      episode_code: -1,
      episode_key : -1,
      id: -1, 
      layout: 'indexLayout',
      quality : -1,
      season_key : -1,
      source: 'searchResults',
      translation_id : -1, 
      type: ''
    },
    isMobile : (window.innerWidth < 500 || window.innerHeight < 900) ? true : false,
    labels : {
      movies: 'Кино',           
      show_tv_series: 'ТВ',
      tv_series: 'Сериал'
    },
    mediaDialog : {
      absolute : false,
      position : {x: -1000, y: -1000},          
      show : false,          
      title : '',
      sources : {}
    },
    playerVideoSrc : '',
    searchResults : {},        
    showPlayer : false,
    showSpinner : false,
    toastMessage: {
      message: '',
      show: false,
      timeout: null
    },
    translations : {},
    watchHistory : [],
    watchOnline : (window.localStorage.getItem('watchOnline') == 'true') ? true : false    
  }),
  getters: {
    getBookmarksList: (state) => {
      let _return = []
      let list = [...state.bookmarks]
      list.reverse().forEach((key) => {
        if(state.bookmarksResult[key] != undefined) _return.push(state.bookmarksResult[key])
      })
      return _return
    },
    getCurrentCode: (state) => {
      return [state.current.id, state.current.episode_code].join('::')
    },
    getIsBookmarked: (state) => (id) => {
      return (state.bookmarks != null && state.bookmarks.indexOf(id) > -1)
    },
    getIsWatched: (state) => (key) => {
      return (state.watchHistory != null && state.watchHistory.indexOf(key) > -1)
    },
    getMediaInfo : (state) => (key) => {
      return (state[state.current.source][state.current.id][key] != undefined) ? state[state.current.source][state.current.id][key] : null
    },
    getSortedList: state => {
      return Object.values(state.searchResults).sort((a, b) => {
        return a.ru_title < b.ru_title ? -1 : a.ru_title > b.ru_title ? 1 : 0
      }) 
    },
    getState: state => (keys, sub = null) => {
      let _state = (sub != null && state[sub] != undefined) ? state[sub] : state
      if(Array.isArray(keys)){
        let _return = {}
        keys.forEach((key) => {
          _return[key] = _state[key]
        })
        return _return
      }
      return _state[keys]
    },        
    getTranslations : (state) => {
      return (state[state.current.source][state.current.id].translations != undefined) ? state[state.current.source][state.current.id].translations : null
    },        
  },
  mutations: {
    toggleBookmark: (state, id) => {
      if(state.bookmarks.indexOf(id) < 0){
        state.bookmarks.push(id)
      }else{
        state.bookmarks.splice(state.bookmarks.indexOf(id), 1)
      }
      window.localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
    },
    loadBookmarks: (state) => {
      let localBookmarks = window.localStorage.getItem('bookmarks')
      try{
        localBookmarks = JSON.parse(localBookmarks)
        state.bookmarks = (localBookmarks != null && localBookmarks.length > 0) ? localBookmarks : []
      }catch(e){
        console.log(e)
      }
    },
    loadWatchHistory: (state) => {
      let localHistory = window.localStorage.getItem('watchHistory')
      try{
        localHistory = JSON.parse(localHistory)
        state.watchHistory = (localHistory != null && localHistory.length > 0) ? localHistory : []
      }catch(e){
        console.log(e)
      }
    },
    pushWatchHistory: (state, key) => {
      if(state.watchHistory.indexOf(key) < 0) state.watchHistory.push(key)
      window.localStorage.setItem('watchHistory', JSON.stringify(state.watchHistory))
    },
    resetCurrent : (state) => {
      state.current = {
        episode_code: -1,
        episode_key : -1,
        id: null,
        layout: 'indexLayout',
        quality : -1,
        season_key : -1,
        source: 'searchResults',
        translation_id : -1,
        type: null
      }
    },
    setCurrent : (state, payload) => {
      for(let key of Object.keys(payload)){
        state.current[key] = payload[key]
      }
    },
    setLayout: (state, newLayout) => {
      state.current.layout = newLayout
    },
    setMediaDialog : (state, payload) => {
      for(let key of Object.keys(payload)){
        state.mediaDialog[key] = payload[key]
      }
    },
    setState: (state, payload) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
    setTranslations : (state, translations) => {
      translations.data.forEach((translation) => {
        state.translations[translation.id] = translation.short_title
      })
    },
    showToastMessage: (state, message) => {
      state.toastMessage.message = message
      state.toastMessage.show = true
      clearTimeout(state.toastMessage.timeout)
      state.toastMessage.timeout = setTimeout(() => { state.toastMessage.show = false }, 5000)
    }
  },
  actions: {
    prepareUrl ({state}, payload){
      let url = {type: '', params: {}}          
      url.type = payload.type
      delete payload.type
      url.params = payload
      let a = Object.keys(url.params).map((key) => key + '=' + url.params[key])
      a.push('api_token=' + state.api.token)
      url = state.api.protocol + state.api.host + '/api/' + url.type + '?' + a.join('&')
      return url          
    },
    async updateTranslations ({state, commit, dispatch}) {
      const url = await dispatch('prepareUrl', {type: 'translations'})
      try{
        state.showSpinner = true
        const response = await fetch(url)
        if(response.ok){
          let translations = await response.json()
          commit('setTranslations', translations)
        }else{
          throw new Error(response.status)
        }
      }catch(e){
        console.log(e)
      }finally{
        state.showSpinner = false
      }
    },
    async loadBookmarks ({state, dispatch}) {
      const ids = state.bookmarks.map((el) => {
        return {id: el.split('_')[el.split('_').length - 1], type: el.split('_').splice(0, [el.split('_').length - 1]).join('-')}
      })
      state.showSpinner = true
      for(let el of ids){
        const url = await dispatch('prepareUrl', {type: el.type, id: el.id})
        try{
          const response = await fetch(url)
          if(response.ok){
            let data = await response.json()
            if(data.data[0] != undefined){
              dispatch('processResponse', {response: data, target: 'bookmarksResult'})
            }
          }else{
            throw new Error(response.status)
          }
        }catch(e){
          console.log(e)
        }
      }
      state.showSpinner = false         
    },
    async searchMedia({state, commit, dispatch}, {types, searchQuery, yearFilter}){
      commit('resetCurrent')
      state.searchResults = {}
      for(let type of types){
        let url = await dispatch('prepareUrl', {type: type, query: searchQuery, year: yearFilter})
        state.showSpinner = true            
        try{
          const response = await fetch(url)
          if(response.ok){
            const json = await response.json()
            dispatch('processResponse', {response: json})
          }else{
            throw new Error(response.status)
          }
        }catch(e){
          console.log(url, e)
        }finally{
          state.showSpinner = false              
        }
      }
      if(Object.keys(state.searchResults).length == 0){
        commit('showToastMessage', 'Ничего не найдено')
      }
    },
    processResponse({state}, {response, target = 'searchResults'}){
      if(response.data.length > 0){
        response.data.forEach((media) => {
          media.content_type = (media.content_type == 'movie') ? 'movies' : media.content_type
          const id = media.content_type + '_' + media.id
          let element = {
            id: id,
            orig_title: media.orig_title,
            seasons: (media.season_count != undefined) ? media.season_count : 0,
            translations: {},
            src: state.api.protocol + media.iframe_src,
            episodes_info: {},
            type: (media.content_type == 'movies') ? 'movie' : 'tv',
            label: (state.labels[media.content_type] != undefined) ? state.labels[media.content_type] : '???',
            ru_title: media.ru_title,
            released: (media.content_type == 'movies') ? media.released.substring(0,4) : media.start_date.substring(0, 4),
            kinopoisk_id: media.kinopoisk_id,
            avatar: state.api.protocol + '//st.kp.yandex.net/images/film_big/' + media.kinopoisk_id + '.jpg'
          }
          if(media.episodes != undefined){
            let episodes_info = {}
            media.episodes.forEach((episode) => {
              let episode_key = episode.season_num + '_' + Number(episode.num)
              episodes_info[episode_key] = {
                season: episode.season_num, 
                num: episode.num, 
                orig_title: episode.orig_title, 
                ru_title: episode.ru_title
              }
            })
            element.episodes_info = episodes_info
          }
          state[target][id] = element
        })
      }
    },
    async loadMedia({state}, {id, source = 'searchResults'}){
      state.current.source = source
      const parseHTML = (html) => {
        let userkey = html.match('var userKey = "(.*)";')
        let type = html.match('id="videoType" value="(.*)"')
        let files = html.match('id="files" value="(.*)"')
        files = files[1].split(userkey[1]).join('')
        files = files.split('&quot;').join('"')
        let data = JSON.parse(files)
        //let keys = Object.keys(data)
        return {'type': type[1], 'data': JSON.parse(files), 'keys': Object.keys(data)}
      }
      const getLinks = (files) => {
        let url_base
        let qualities = []
        let links = files.split(',');
        links = links[links.length-1].substring(7).split(' or ');
        for(let i = 0; i < links.length; i++){
          let tmp = links[i].split('/');
          if(qualities.indexOf(tmp[tmp.length-1].split('.mp4').join('')) < 0) qualities.push(tmp[tmp.length-1].split('.mp4').join(''))
          url_base = tmp.slice(0, -1).join('/')
        }
        return {qualities: qualities.sort(), link_base: state.api.protocol + url_base}
      }
      const layout = (state[state.current.source][id].type == 'movie') ? 'detailsMovieLayout' : 'detailsTvLayout'
      state.current.layout = layout
      state.current.id = id
      state.current.type = state[state.current.source][id].type
      let url = state[state.current.source][id].src
      state.showSpinner = true
      try{
        const response = await fetch(url)
        if(response.ok){
          let data = await response.text()
          if(data.length > 0){
            data = parseHTML(data)
            if(data.keys != undefined && data.data != undefined){
              data.keys.forEach(async (key) => {
                if(key > 0){
                  if(data.type == 'movie'){
                    state[state.current.source][id].translations[key] = {
                      translation_id: key, 
                      translation_title: state.translations[key], 
                      links: getLinks(data.data[key])
                    }                        
                  }else{
                    state[source][id].translations[key] = {
                      translation_id: key, 
                      translation_title: state.translations[key], 
                      episodes: [], 
                      seasons: []
                    }
                    let variant = JSON.parse(data.data[key])
                    variant.forEach(async (v) => {
                      if(Object.prototype.hasOwnProperty.call(v, 'folder')){
                        var season = {
                          season_title: v.comment, 
                          episodes: []
                        }
                        v.folder.forEach(async (episode) => {
                          let title = episode.comment.split('&lt;br&gt;&lt;i&gt;')[0]
                          if(state[state.current.source][id].episodes_info[episode.id] != undefined){
                            let info = state[source][id].episodes_info[episode.id]
                            let _title = (info.orig_title.toLowerCase() == info.ru_title.toLowerCase()) ? info.orig_title : info.orig_title + " / " + info.ru_title
                            title = info.season + '.' + info.num + ' ' + _title
                          }
                          season.episodes.push({
                            episode_code: episode.id,
                            episode_title: title, 
                            links: getLinks(episode.file)
                          })
                        })
                        state[state.current.source][id].translations[key].seasons.push(season)
                      }else{
                        state[state.current.source][id].translations[key].episodes.push({
                          episode_title: v.comment.split('&lt;br&gt;&lt;i&gt;')[0], 
                          links: getLinks(v.file)
                        })
                      }
                    })
                  }
                }
              })
            }
          }else{
            console.log('zero data')
          }
        }else{
          console.log('data not loaded')
        }
      }catch(e){
        console.log(e)
      }finally{
        state.showSpinner = false
      }
    },
    playVideo({state}, {src, quality}){
      state.current.quality = quality
      state.playerVideoSrc = src
      state.showPlayer = true
    },
    playNextVideo: ({state, dispatch}) => {
      const id = state.current.id
      const translation_id = state.current.translation_id
      const season_key = state.current.season_key
      const episode_key = state.current.episode_key
      let quality = state.current.quality
      const media = state[state.current.source][id].translations[translation_id]
      const folder = (season_key != -1) ? media.seasons[season_key].episodes : media.episodes
      if(folder.length > episode_key + 1){
        state.showPlayer = false
        if(folder[episode_key+1].links.qualities.indexOf(quality) == -1){
          quality = folder[episode_key+1].links.qualities[folder[episode_key+1].links.qualities.length -1]
        }
        let next_src = folder[episode_key+1].links.link_base + '/' + quality + '.mp4'
        setTimeout(() => {
          state.current.episode_key = episode_key + 1
          state.current.episode_code = folder[episode_key+1].episode_code
          dispatch('playVideo', {src: next_src, quality: quality})
        }, 50)
      }
    }
  }
})
