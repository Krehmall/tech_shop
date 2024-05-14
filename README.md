## Tech Shop

This is my first uploaded to **GitHub** FullStack App.<br>
Made together with another developer named [Itshak](https://github.com/izchak).<br>
It's computer/mobile shop multipage website.
**MongoDB** was used as data base.<br>
Server part was made with **NodeJs+Express+JavaScript**.<br>
Client part was made with **Vanila JS+HTML+SCC**.<br>
Server and Client communicates between them with API.<br>
To run this App [NodeJs](https://nodejs.org/en/download/current) is required to be installed.

### How to run the App:

- Go to directory ***modules/dbModule.js*** in line number 3 you must write: `const url = "YourMongoBDLink"` .(You must to have [MongoDB](https://www.mongodb.com/cloud/atlas/register?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_prosp-brand_gic-null_emea-il_ps-all_desktop_eng_lead&utm_term=mongo%20database&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=1718986534&adgroup=66929800266&cq_cmp=1718986534&gad_source=1&gclid=CjwKCAjwl4yyBhAgEiwADSEjeIfv6Salm2LWP60ZUc-NnBt0FFdoDDQ_jFy_2PpPtbDA2tuydoqNzxoC_M0QAvD_BwE) account)

- Go to console in app directory enter command `npm i`

- Then in console enter command `node server.js`

- In your browser follow the link http://localhost:3000

### Description:

You can register and then login all new users will be saved in database.<br>
At homepage you can see all products, sort and filter them.<br>
You can add to cart products, and then pay your order if you enter the cart.<br>
If you enter as admin user(look in Data Base) you may see all orders made by not admin users.
