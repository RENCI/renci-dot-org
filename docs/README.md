# Documentation

## System Architecture

This application is comprised of a few services that serve different pieces of content. That content is consumed at various times, in both the build and runtime environments. 

![Data flow diagram](./renci-dot-org-arch.png?raw=true "Data flow diagram")
_Note that this diagram describes the entire application, while this repository represents only the front-end piece of it._ The content management and API portion of this application lives in [RENCI/renci-dot-org-api](https://github.com/RENCI/renci-dot-org-api/).
