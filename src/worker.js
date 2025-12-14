import data from "./data.json"
import template from "./template.html"

const mapping = {
  "originalURL": "Original work URL",
  "originalURL?": "Original work URL (optional on form, encouraged though)",
  "postURL": "Infringing URL",
  "account": "An account on the service"
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

      let sub = `<section class="page-item"><h2 id=${encodeURI(block.service)}>${icon}${block.service}</h2>`
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

      sub = `${sub}${links}</section>`

      r = `${r}${sub}`
    }

    toc = `<ul id="table-of-contents">${toc}</ul>`

    r = template.replace("{{{toc}}}", toc).replace("{{{r}}}", r)

    let response = new Response(r)

    response.headers.set("content-type", "text/html")

    return response
  }
};