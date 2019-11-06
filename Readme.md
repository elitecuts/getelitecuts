So then, how do you get the analytics to only show up on a production environment? When building your Jekyll project with jekyll build, you’ll want to prefix it with JEKYLL_ENV=production so the complete command looks like this:

JEKYLL_ENV=production jekyll build
