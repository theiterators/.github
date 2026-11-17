<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/theiterators/.github/main/brand/logo-dark.svg">
  <img alt="Iterators" src="https://raw.githubusercontent.com/theiterators/.github/main/brand/logo.svg" width="200">
</picture>

**Iterators is an engineering consultancy for AI-native products, in Warsaw since 2013.** You get a product that keeps working as it grows, and a partner who answers for it. The engineers build on a typed, functional Scala backend, and these are the libraries they wrote for it.

[iteratorshq.com](https://www.iteratorshq.com/) · [Open source](https://www.iteratorshq.com/open-source/) · [Blog](https://www.iteratorshq.com/blog/) · [Book a call with a partner](https://www.iteratorshq.com/contact/)

### Four libraries for typed Scala services

**[http4s-stir](https://github.com/theiterators/http4s-stir)** lets you keep the routing style of Pekko HTTP and Akka HTTP on http4s and cats-effect, with a matching test kit. It runs on the JVM, Scala.js and Scala Native.<br>
[![Latest version on Maven Central](https://img.shields.io/maven-metadata/v.svg?metadataUrl=https%3A%2F%2Frepo1.maven.org%2Fmaven2%2Fpl%2Fiterators%2Fhttp4s-stir_3%2Fmaven-metadata.xml&label=Maven%20Central&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/http4s-stir/releases) [![Date of the latest release](https://img.shields.io/github/release-date/theiterators/http4s-stir?label=latest%20release&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/http4s-stir/releases) [Docs](https://theiterators.github.io/http4s-stir/) · [Migrating from Pekko or Akka HTTP](https://theiterators.github.io/http4s-stir/migration)

**[kebs](https://github.com/theiterators/kebs)** derives JSON codecs, database mappings and HTTP parameter readers for your own types at compile time, so a `UserId` stays a `UserId` from the request to the database.<br>
[![Latest version on Maven Central](https://img.shields.io/maven-metadata/v.svg?metadataUrl=https%3A%2F%2Frepo1.maven.org%2Fmaven2%2Fpl%2Fiterators%2Fkebs-core_3%2Fmaven-metadata.xml&label=Maven%20Central&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/kebs/releases) [![Date of the latest release](https://img.shields.io/github/release-date/theiterators/kebs?label=latest%20release&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/kebs/releases) [Docs](https://theiterators.github.io/kebs/) · [Why kebs exists](https://www.iteratorshq.com/blog/typed-domain-modeling-in-scala-has-a-tax-kebs-library-eliminates-it/) · [IntelliJ plugin](https://github.com/theiterators/kebs-intellij)

**[sealed-monad](https://github.com/theiterators/sealed-monad)** lets business logic with many outcomes read top to bottom, as one for-comprehension instead of nested pattern matches.<br>
[![Latest version on Maven Central](https://img.shields.io/maven-metadata/v.svg?metadataUrl=https%3A%2F%2Frepo1.maven.org%2Fmaven2%2Fpl%2Fiterators%2Fsealed-monad_3%2Fmaven-metadata.xml&label=Maven%20Central&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/sealed-monad/releases) [![Date of the latest release](https://img.shields.io/github/release-date/theiterators/sealed-monad?label=latest%20release&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/sealed-monad/releases) [Docs](https://theiterators.github.io/sealed-monad/) · [Linear business flows](https://www.iteratorshq.com/blog/sealed-monad-linear-business-flows-as-algebraic-data-types/) · [Benchmarks](https://www.iteratorshq.com/blog/benchmarking-functional-error-handling-in-scala/)

**[baklava](https://github.com/theiterators/baklava)** turns the HTTP tests you already write into OpenAPI, HTML docs, Postman collections and typed TypeScript or Scala clients, so the docs cannot drift from the code.<br>
[![Latest version on Maven Central](https://img.shields.io/maven-metadata/v.svg?metadataUrl=https%3A%2F%2Frepo1.maven.org%2Fmaven2%2Fpl%2Fiterators%2Fbaklava-core_3%2Fmaven-metadata.xml&label=Maven%20Central&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/baklava/releases) [![Date of the latest release](https://img.shields.io/github/release-date/theiterators/baklava?label=latest%20release&style=flat-square&labelColor=0d1553&color=ffb97c)](https://github.com/theiterators/baklava/releases) [Docs](https://theiterators.github.io/baklava/) · [How it works](https://www.iteratorshq.com/blog/baklava-generate-api-documentation-and-type-safe-clients-from-scala-routing-tests/)

### One request through all four

[madrileño](https://madrileno.dev/), the Scala 3 backend template that Iterators maintains for work with coding assistants, uses all four libraries on every route. This is a bid in its worked example, a wine auction:

```text
POST /auctions/{id}/bids
│
├─ http4s-stir   matches the route
├─ kebs          {id} → AuctionId
│                JSON → your types
▼
placeBid(command)
│
├─ sealed-monad  every outcome is a
│                case, no nesting
▼
201 Created
409 bid-too-low
409 auction-ended
┊
└─ baklava       at test time:
                 OpenAPI, docs and
                 a typed TS client
```

[Start a backend from madrileño](https://madrileno.dev/docs/getting-started/), or take its [React and React Native templates](https://github.com/madrileno-dev), which compile against the same generated contract. For something smaller, [pekko-http-microservice](https://github.com/theiterators/pekko-http-microservice) is one REST service in Pekko HTTP and Scala 3 with a [step-by-step tutorial](https://github.com/theiterators/pekko-http-microservice/blob/master/TUTORIAL.md). Projects that are no longer maintained are archived, so they stay readable and say so.

### The team behind the code

The people who maintain these libraries build web and mobile products, AI features and the backends behind them, and **they keep running them for years**. If your product needs that, your first call is with a partner, and a partner stays accountable for your product from then on. Iterators has organized [ScalaWAW](https://www.meetup.com/scalawaw/), the Warsaw Scala meetup, since 2015.

**[Book a call with a partner →](https://www.iteratorshq.com/contact/)**

[What Iterators does](https://www.iteratorshq.com/services/) · [Work](https://www.iteratorshq.com/portfolio/) · [Careers](https://www.iteratorshq.com/careers/)
