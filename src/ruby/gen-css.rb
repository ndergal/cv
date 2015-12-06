
require 'sass'
require 'fileutils'

sass_engine = Sass::Engine.for_file('sass/base.scss', {})
output = sass_engine.render
File.open('export/public.css', 'w') { |file|
    file.write output
}
