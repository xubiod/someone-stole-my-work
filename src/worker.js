import data from "./data.json"

const mapping = {
  "originalURL": "Original work URL",
  "originalURL?": "Original work URL (optional on form, encouraged though)",
  "postURL": "Infringing URL"
}

export default {
  async fetch(request, env, ctx) {
    let r = ""
    let toc = ""

		const json_data = JSON.parse(data)
    
    for (const block of json_data) {
      let icon = ""

      if (block.icons) {
        for (const icon_classes of block.icons) {
          icon = `${icon}<i class="icons ${icon_classes}"></i>`
        }
        icon = `<span class="icon-span">${icon}</span> `
      }

      let sub = `<h2 id=${encodeURI(block.service)}>${icon}${block.service}</h2>`
      toc = `${toc}<li><a href="#${encodeURI(block.service)}">${icon}<span class="text-span">${block.service}</span></a></li>`

      if (block.requirements) {
        sub = `${sub}<p>You will need on hand:<ul>`
        for (const requirement of block.requirements) {
          sub = `${sub}<li>${mapping[requirement] ?? requirement}</li>`
        }
        sub = `${sub}</ul></p>`
      }

      if (block.instructions) {
        sub = `${sub}<p>${block.instructions}</p>`
      }

      let links = ``

      if (block.reportURL) {
        links = `${links}<li><a href="${block.reportURL}" rel="noopener noreferrer"><i class="icons fa-solid fa-clipboard-list"></i> <span class="text-span">Report form</span></a></li>`
      }

      if (block.supportPage) {
        links = `${links}<li><a href="${block.supportPage}" rel="noopener noreferrer"><i class="icons fa-solid fa-life-ring"></i> <span class="text-span">Support page</span></a></li>`
      }

      if (block.email) {
        links = `${links}<li><a href="mailto:${block.email}?subject=DMCA Takedown Request"><i class="icons fa-solid fa-envelope"></i> <span class="text-span">Send e-mail</span></a></li>`
      }

      if (links.length > 0) {
        links = `<ul class="link-list">${links}</ul>`
      }

      sub = `${sub}${links}`

      r = `${r}${sub}<br />`
    }

    toc = `<ul id="table-of-contents">${toc}</ul>`

    r = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Someone stole my work!</title>

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta name="description" content="A collection to platforms with copyright report links to take back what is yours!" />
    <meta name="author" content="Xubiod" />
    <meta name="creator" content="Xubiod" />
    
    <meta property="og:title" content="Someone stole my work!"/>
    <meta property="og:type" content="website"/>
    <meta property="og:description" content="A collection of platforms with copyright report links to take back what is yours!" />
    
    <meta property="twitter:title" content="Someone stole my work!"/>
    <meta property="twitter:description" content="A collection of platforms with copyright report links to take back what is yours!" />
    <style>
    html { 
      font-family: sans-serif;
      position: relative;
      top: 0;
      left: 0;
      margin: 1em;
      width: calc(100vw - 2em);
    }

    body {
      margin: 0 auto;
      max-width: 60em;
      padding-bottom: 2em;
    }

    a {
      text-decoration: none;
      
      & > span.text-span {
        text-decoration: underline;
      }
    }

    ul#table-of-contents {
      display: grid;
      grid: auto-flow / 1fr 1fr 1fr 1fr;
      list-style: none;

      padding: 0;
      border: 1px solid #ddd;

      & > li {
        display: block;
        width: 100%;
        height: 4em;

        border: 1px solid #ddd;

        & > a {
          display: flex;
          width: 100%;
          height: 100%;

          flex-direction: column;

          text-align: center;

          align-items: center;
          justify-content: center;

          text-decoration: none;

          & > span.icon-span {
            font-size: 24pt;
          }
        }
      }

      & > li:nth-child(even) {
        background-color: #fefefe;
      }

      & > li:hover {
        background-color: rgba(255, 255, 174, 1);
      }
    }

    ul.link-list {
      display: flex;

      list-style: none;
      padding: 0;

      & > li {
        width: 10em;
        height: 2em;
        border: 1px solid #ddd;

        margin: 0 1em;

        & > a {
          display: flex;
          width: 100%;
          height: 100%;

          text-align: center;

          align-items: center;
          justify-content: center;
        }
      }

      & > li:hover {
        background-color: rgba(255, 255, 174, 1);
      }
    }

    i.icons {
      color: black;
      text-decoration: none;
    }
    </style>
    <script src="https://kit.fontawesome.com/ea7ca75325.js" crossorigin="anonymous"></script>
    </head>
    <body>
    <h1>Someone stole my work!</h1>
    <p>Theft is very ICKY, and you can use copyright to get back what is yours!</p>
    <p><em>Do note that copyright takedowns are a legal process, and as such you will need your legal information in many cases to make claims.</em></p>
    <p><strong>Has someone sent you a false claim?</strong> Look at provided support pages for counter claims. <em>You must be fast though, within about a week of notification!</em></p>
    <p><em>Something missing/wrong? <a href="https://github.com/xubiod/someone-stole-my-work/issues">Make an issue on GitHub</a>. In many cases searching "[service] copyright claim" in a search engine will give you what you need as well.</em></p>
    <hr />
      ${toc}
      <p><sub>Brand icons provided by <a href="https://fontawesome.com/" rel="noopener noreferrer">Font Awesome</a>. If a brand icon was missing, another generic one is used instead.</sub></p>
      <hr />
      ${r}
      <footer>
        Compiled together by Xubiod. <a href="https://github.com/xubiod/someone-stole-my-work">Source code</a>.
      </footer>
    </body>
    </html>`

    let response = new Response(r)

    response.headers.set("content-type", "text/html")

    return response
  }
};