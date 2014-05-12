
/**
 * WPCOM module
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var Media = require('../lib/media');
var util = require('./util');
var fs = require('fs');
var assert = require('assert');

/**
 * Testing data
 */

var test = require('./data');

/**
 * WPCOM instance
 */

describe('WPCOM#Site#Media', function(){

  // Create a new_media before to start the tests

  var new_media;
  before(function(done){
    util.addMedia(function(err, media) {
      if (err) throw err;

      new_media = media;
      done();
    });
  });

  describe('sync', function(){

    it('should create an `Media` instance from `Site`', function(){
      var media = WPCOM().site().media();
      assert.ok(media instanceof Media);
    });

  });

  describe('async', function(){

    describe('media.get()', function(){

      it('should get added media', function(done){
        var site = util.private_site();
        var media = site.media(test.media_id);

        media.get(function(err, info){
          if (err) throw err;

          assert.equal(3, info.id);
          done();
        });
      });

    });

    describe('media.addFiles([fs])', function(){

      it('should create a new media from a file', function(done){
        var site = util.private_site();

        // pass streams
        var files = [];
        for (var i = 0; i < test.new_media_data.files.length; i++) {
          files.push(fs.createReadStream(test.new_media_data.files[i]));
        }

        site
        .media()
        .addFiles(files, function(err, data){
          if (err) throw err;

          assert.ok(data);
          assert.ok(data.media instanceof Array);
          assert.equal(test.new_media_data.files.length, data.media.length);
          done();
        });

      });

    });

    describe('media.addUrls([\'url1\', \'url2\'])', function(){

      it('should create a new media', function(done){
        var site = util.private_site();

        site
        .media()
        .addUrls(test.new_media_data.media_urls, function(err, data){
          if (err) throw err;

          assert.ok(data);
          assert.ok(data.media instanceof Array);
          assert.equal(test.new_media_data.media_urls.length, data.media.length);
          done();
        });

      });

    });

    describe('media.delete()', function(){

      it('should delete a media', function(done){
        var site = util.private_site();


        site
        .media(new_media.media[0].id)
        .del(function(err, data){
          if (err) throw err;

          assert.equal(new_media.media[0].id, data.id);
          done();
        });

      });

    });

  });

});
