(function() {
  function SongPlayer() {
       var SongPlayer = {};
       /**
       *@desc Current Song Object
      *@type {Object}
       */
       var currentSong = null;

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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });

          currentSong = song;
        };

        /**
        *@function playSong
        *@desc Plays song/currentBuzzObject upon click and sets attribute to true
        *param {Object} song
        */

        var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        }



        /**
        *@function SongPlayer.play(song)
        *@desc Plays Song from beginning or from pause point
        *@param {Object} song
        */
        SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 currentBuzzObject.play();
                 song.playing = true;

             } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
