# A solid Secret Santa

My goal was to create a solid and easy to handle Secret Santa generator. In comparison to existing projects it should be especially able to handle one drawback: **The manual exclusion or forced-connection between two or more participants**. Some additional nice-to-have's would be input forms for budget limitation as well as date and place of the event.

My current version is published on https://apps.handy-solutions.de/a-solid-secret-santa/dist/index.html#/. It runs through all the input steps and sends finally an event containing all the data to my server, which forwards the information for all participants via email.

Some more ideas in my head are:
- make the project multilingual
- offer a wishlist, so your Secret Santa can be informed about your desired presents
- save events persistent, so one is able to resend the invitations, wishlists etc.
- more ideas are welcome!

Some known bugs are:
+ text next to button is not vertically centered in Step2.vue
+ going back to main page while creating an event via browser's back button is possible without warning
+ used table e.g. in Step2.vue, Step6.vue and Step8.vue is not responsive

Technically speaking I used Vue.js (https://vuejs.org/) for frontend dev an Express.js (https://expressjs.com/) for backend dev. To ensure responsive design I chose Bulma (https://bulma.io/) and for fancy reasons I even discovered Sass (https://sass-lang.com/) ;). 

Personally speaking, I don't have time anymore to contribute to the frontend, but would be more than happy to provide the server maintaining and extending the API (and hopefully db). The backend is no mystery, but right now I can not publish it because of crosslinks with other projects. I am working on seperation...

Feel free to join or ask/suggest/propose!

For liscence check LISCENCE.md.