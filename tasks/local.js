var path = require("path");
var instrument = require("mrmime").instrument;

module.exports = function(grunt) {
  var relative = path.resolve.bind(path, process.cwd());

  grunt.registerMultiTask("local", "Mock local requests and playback.", function() {
    var options = this.options();

    // Make long running for development.
    if (options.keepalive) {
      this.async();
    }

    // Set the output relative to the Gruntfile.
    options.out = relative(options.out);

    // Set all static paths relative to the Gruntfile.
    Object.keys(options.static || {}).forEach(function(key) {
      options.static[key] = relative(options.static[key]);
    });

    // Ensure that the target fixture directory has been created.
    grunt.file.mkdir(path.join(options.out, options.mock.host));

    // Instrument either record or playback.
    instrument(options);
  });
};
