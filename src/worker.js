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
      let sub = `<h2 id=${encodeURI(block.service)}>${block.service}</h2>`
      toc = `${toc}<li><a href="#${encodeURI(block.service)}">On ${block.service}</a></li>`

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

      if (block.reportURL) {
        sub = `${sub}<p><a href="${block.reportURL}" rel="noopener noreferrer">Report form</a></p>`
      }

      if (block.supportPage) {
        sub = `${sub}<p><a href="${block.supportPage}" rel="noopener noreferrer">Support page</a></p>`
      }

      r = `${r}${sub}<br />`
    }

    toc = `<ul>${toc}</ul>`

    r = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Someone stole my work!</title>
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
    }
    </style>
    </head>
    <body>
    <h1>Someone stole my work!</h1>
    <p>Theft is very ICKY, and you can use copyright to get back what is yours!</p>
    <p><em>Do note that copyright takedowns are a legal process, and as such you will need your legal information in many cases to make claims.</em></p>
    <p><em>Something missing/wrong? <a href="https://github.com/xubiod/someone-stole-my-work/issues">Make an issue on GitHub</a>.</em></p>
    <hr />
      ${toc}
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