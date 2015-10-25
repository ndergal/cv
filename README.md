# My Curriculum Vitae

This repository contains my curriculum vitae.

No more, no less.

# What ?

* Content of the CV is in
[Markdown format][1].
* HTML and PDF rendered versions can also be found here :
  - HTML version
  - PDF version
* Rendering is done  with
[the useful Markdown2Resume tool][2].

# How ?

If you want to play around with the development tools,
you should follow those instructions in the right order :

1. Install [NPM][3]. We use it to manage dependencies.

2. With [NPM][3] installed, get [Napa][4] (used to help [NPM][3]
to manage dependencies with no ```package.json``` file descriptor)
with this command :
```
# '-g' is for 'globally'
$ npm install -g napa
...
```

3. Then you can bootstrap dependencies with [NPM][3] :
```
# Will install all the dev. modules locally
$ npm install
...
```

4. [Gulp](http://gulpjs.com) is used as workflow engine by running tasks :
    ```
    $ gulp
    # It will run the default task that renders, serves pages
    # and opens the page on your web-browser with live-reload enabled
    ```


# Licensing

This repository is provided on the [ISC license](http://www.gnu.org/licenses/license-list.html#ISC).

You will find the License [here](./LICENSE.md).

It means you can use the content only
if you make it appear with the same license.


[1]: https://daringfireball.net/projects/markdown
[2]: https://github.com/there4/markdown-resume
[3]: https://npmjs.org
[4]: https://www.npmjs.com/package/napa
[5]: http://gulpjs.com
