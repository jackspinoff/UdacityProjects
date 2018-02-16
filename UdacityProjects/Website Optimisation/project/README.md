## Website Performance Optimization portfolio project

###Environment Set Up

1. Created project folder in Home Directory
1. Created dist folder to store minified css and js files
1. Set up Git
1. Set up Gulp
1. Gulpfile.js: installed gulp-uglify, gulp-rename, gulp-cssnano & gulp-cssmin and edited the function to automatically minify js and css file by specifying dist as destination folder (dist as the same folders of the main project)
1. Linked index.html and pizza.html files to new minified js and css files inside dist
1. Added .gitignore file to remove node_modules folder from Github
1. Created repository on Github
1. Pushed entire project to remote repository on Github and used Github Pages to access the website online

###Part 1: Optimize PageSpeed Insights score for index.html

####Profiling

#####First step
Used [Google PageSpeed insights](https://developers.google.com/speed/pagespeed/insights/) to check the speed of the mobile and desktop version of index.html file (hosted on Github and using Github Pages)

#####First results:
* Mobile speed score: 28/100
* Desktop speed score: 30/100

####Optimising

#####Image

* Used Photoshop to reduce the size of pizzeria.jpg from 2370.074 Kb to 21.6 Kb (file renamed: pizzeria_small.jpg)

#####JS

* Created analytics.js file and added asynchronous loading to all the scripts inside index.html file and moved the scripts at the bottom

#####CSS

* Added a script to implement Open Sans font (400,700) and removed the render blocking link (CSS)
* Added media type to print.css file
* Inlined style.css file inside index.html
* Created portrait.css file, moved media query (Smartphone portrait) from style.css to portrait.css, added media type to portrait.css

####Measuring

#####Results after optimisation:
* Mobile speed score: 91/100
* Desktop speed score: 93/100

####Comments

After fulfilling the first goal exceeding the expectations I moved to the second part of the project

###Part 2: Optimize Frames per Second in pizza.html

####Profiling

#####First step
Used Google Dev tools to measure the "Average time to generate last 10 frames" by scrolling the page and "Time to resize pizzas" by using the sizeSlider

#####First results:
* Average time to generate last 10 frames: Range bet. 27.449 & 47.03 ms
* Time to resize pizzas: bet. 157 & 187 ms

####Optimising

#####JS

1. Replaced "querySelector" by "getElementById" (edited lines specified in the comments inside main.js)
1. Replaced "querySelectorAll" by "getElementsByClassName" (edited lines specified in the comments inside main.js)
1. Moved all variables outside the for loop and created variable "allPizzas" to apply newWidth and dx to all pizza containers
1. Moved the variable pizzasDiv outside the for loop
1. Created a function for caching items & returning cached items if they are cached
1. Added "createDocumentFragment" to create a node not included in the DOM and then attached to the DOM

#####First results:
* Average time to generate last 10 frames: 0.5885 ms (Best result)
* Time to resize pizzas: 1.389 ms

####Comments

To check the the results shown above, please test this project by using the following link: [jackspinoff.github.io](http://jackspinoff.github.io/) (Github Pages)




