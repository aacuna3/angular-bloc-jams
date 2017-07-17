(function() {
  function SongPlayer($rootScope, Fixtures) {
       var SongPlayer = {};

       /**
       *@desc Tells which album is playing
       @type {Object}
       */
       var currentAlbum = Fixtures.getAlbum();

       /**
       * @desc Buzz object audio file
       * @type {Object}
       */
       var currentBuzzObject = null;

       /**
       * @function setSong
       * @desc Stops currently playing song and loads new audio file as currentBuzzObject
       * @param {Object} song
       */
       var setSong = function(song) {
            if (currentBuzzObject) {
              stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });

          currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
              SongPlayer.currentTime = currentBuzzObject.getTime();
            });
          });

          SongPlayer.currentSong = song;
        };

        /**
        *@function playSong
        *@desc Plays song/currentBuzzObject upon click and sets attribute to true
        *@param {Object} song
        */
        var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        }

        /**
        *@function pauseSong
        *@desc Pauses song/currentBuzzObject upon click and sets attribute to false
        *@param {Object} song
        */
        var pauseSong = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
        }
        /**
        *@function stopSong
        *@desc Stops song/currentBuzzObject upon click and sets attribute to null
        *@param {Object} song
        */

        var stopSong = function() {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        }


        /**
        *@function getSongIndex
        *@desc Pulls the song index for the next and back buttons
        *@param {Object} song
        */
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        };

        /**
        *@desc Current Song Object
        *@type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        *@function SongPlayer.play(song)
        *@desc Plays Song from beginning or from pause point
        *@param {Object} song
        */
        SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if (SongPlayer.currentSong !== song) {
            setSong(song);
            currentBuzzObject.play();
            song.playing = true;

          } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
              currentBuzzObject.play();
            }
          }
        };
         /**
         @function SongPlayer.pause(song)
         @desc Pauses song at time point upon click
         @param {Object} song
         */
         SongPlayer.pause = function(song) {
           song = song || SongPlayer.currentSong;
           currentBuzzObject.pause();
           song.playing = false;
        };
        /**
        *@function SongPlayer.previous
        *@desc goes back one song, stops if first song in list
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            stopSong();
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
        };

        /**
        *@function SongPlayer.next
        *@desc goes forward one song, stops if last song
        */
        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
           currentSongIndex++;

           if (currentSongIndex > Object.keys(currentAlbum).length) {
             stopSong();
           } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
           }
       };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
          }
        };

       return SongPlayer;
   }
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
