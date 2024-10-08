// build.sbt
name := "prestamoapp"

name := "prestamoapp"

version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)

scalaVersion := "2.13.14"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play" % "2.8.20", // O la versión que estés usando
  "com.typesafe.slick" %% "slick" % "3.4.0", // Asegúrate de que sea compatible
  "mysql" % "mysql-connector-java" % "8.0.30", // Asegúrate de que la versión sea correcta
  "com.typesafe.play" %% "play-slick" % "5.0.0", // Asegúrate de que sea compatible
  "com.typesafe.play" %% "play-slick-evolutions" % "5.0.0" // Para las evoluciones de la base de datos
)


// Para habilitar CORS (Cross-Origin Resource Sharing)
play.filters.enabled += "play.filters.cors.CORSFilter"

