
require 'sass'
require 'fileutils'

sass_engine = Sass::Engine.for_file('src/sass/base.scss', {})
output = sass_engine.render
File.open('src/export/public.css', 'w') { |file|
    file.write output
}
