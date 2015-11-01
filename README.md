# My Curriculum Vitae

This repository contains my curriculum vitae.

No more, no less.

# Why ?

As a software engineer, I wanted my CV to follow my professional practices :

* Source text based to easily use SCMs, merging, diffing, history
* Publicly available, shareable, editable
* HTML W3C compliant but also PDF format to ease reading


I also wanted to (re)-learn some basics of the front [(and back)][8] end
development, using a task runner, livereload, and other facilities.


# What ?

* Content of the CV is in
[Markdown format][1].
* HTML and PDF rendered versions can also be found here :
  - [HTML version](./cv.html)
  - [PDF version](./cv.pdf)
* Rendering is done  with
[the useful Markdown2Resume tool][2].

# How ?

## Easy method : [Docker][6] and [Compose][7]

[Docker][6] is used to make the packaging easy and portable
[Compose][7] will take care of mounting files, forwarding ports, etc.

Ensure you have [Docker][6] and [Compose][7] clients
configured to reach a working Docker Engine

Then, just run  to launch the [Gulp][5] process :
```
$ docker-compose up
```

Open you browser to the page, using your Docker Engine IP :
```
http://<YOUR DOCKER ENGINE IP>:4000/cv.html
```


## Not-so-easy method : Local Gulp

If you know your way with [Gulp][5], [NPM][3],
or just do not want to use [Docker][6],
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

4. [Gulp][5] is used as workflow engine by running tasks :
    ```
    $ gulp
    # It will run the default task that renders, serves pages
    # with live-reload enabled
    ```

5. Open your browser to http://localhost:4000

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
[6]: https://docker.com
[7]: https://docs.docker.com/compose/
[8]: http://www.commitstrip.com/en/2015/09/08/how-to-mess-with-your-project-manager/?setLocale=1
