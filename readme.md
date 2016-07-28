# tja current webpack setup

this is how i've been building web apps recently. if youre reading this a) damn son how u find this and b) you prob wanna go use [this](https://github.com/gaearon/react-hot-boilerplate) or similar instead.

its got:
- webpack
- babel
- webpack-dev-server with HMR and react-hot-loader
- css modules (using postcss+cssnext, various postcss plugins)
- htmlplugin w/ handlebars template if you want to build a custom index.html
- eslint (airbnb default)
- image minification

---

go:
- clone the repo
- `npm i`

cmds:
- `npm start`: runs `webpack-dev-server --inline --hot` at `http://localhost:8080/`
- `npm run dist` (or build, or prod): 1. REMOVES ./dist/ DIRECTORY 2. sends a minified production build there

---

future prob/possibilities for return mebbe
- react-css-modules if/when standard modules get annoying
- some kinda grid - but flexbox prob ok for now