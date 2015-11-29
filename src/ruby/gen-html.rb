require 'haml'
require 'yaml'
require 'fileutils'

data = YAML.load_file 'src/data/info.yaml'
template = File.read 'src/templates/index.haml'
haml_engine = Haml::Engine.new(template)
output = haml_engine.render Object.new, {:data => data }
File.open('src/export/index.html', 'w') { |file|
    file.write output
}
