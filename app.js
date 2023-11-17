const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const app = express()

mongoose
  .connect("mongodb+srv://stanciu2andrei23:stud@bdsa.whubu6g.mongodb.net/")
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

require("./models/Film")
const Film = mongoose.model("films")

app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  })
)
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride("_method"))

app.get("/", (req, res) => {
  const title = "Aplicatie proiect"
  res.render("index", {
    title: title,
  })
})

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/films", (req, res) => {
  Film.find({})
    .lean()
    .sort({ date: "desc" })
    .then(films => {
      res.render("films/index", {
        films: films,
      })
    })
    .catch(error => {
      console.error("Error fetching films:", error)
      res.status(500).send("Internal Server Error")
    })
})

app.get("/films/add", (req, res) => {
  res.render("films/add")
})

app.get("/films/edit/:id", (req, res) => {
  const filmId = req.params.id

  Film.findById(filmId)
    .lean()
    .then(film => {
      res.render("films/edit", { film: film })
    })
    .catch(error => {
      console.error("Error fetching film for editing:", error)
      res.status(500).send("Internal Server Error")
    })
})

app.post("/films", (req, res) => {
  let errors = []
  if (errors.length > 0) {
    res.render("films/add", {
      erros: errors,
      titlu: req.body.titlu,
      regizor: req.body.regizor,
      an_lansare: req.body.an_lansare,
      gen: req.body.gen,
      actori: req.body.gen,
      rating: req.body.rating,
      durata: req.body.durata,
      tara_productie: req.body.tara_productie,
      limba: req.body.limba,
    })
  } else {
    const newUser = {
      titlu: req.body.titlu,
      regizor: req.body.regizor,
      an_lansare: req.body.an_lansare,
      gen: req.body.gen,
      actori: req.body.actori,
      rating: req.body.rating,
      durata: req.body.durata,
      tara_productie: req.body.tara_productie,
      limba: req.body.limba,
    }
    new Film(newUser).save().then(films => {
      res.redirect("/films")
    })
  }
})

app.put("/films/:id", (req, res) => {
  Film.findOne({
    _id: req.params.id,
  }).then(film => {
    film.titlu = req.body.titlu
    film.regizor = req.body.regizor
    film.an_lansare = req.body.an_lansare
    film.gen = req.body.gen
    film.actori = req.body.actori
    film.rating = req.body.rating
    film.durata = req.body.durata
    film.tara_productie = req.body.tara_productie
    film.limba = req.body.limba
    film.save().then(film => {
      res.redirect("/films")
    })
  })
})

app.delete("/films/:id", (req, res) => {
  Film.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect("/films")
  })
})

const port = 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
