package controllers

import javax.inject._
import play.api.mvc._
import play.api.db.Database
import scala.concurrent.{ExecutionContext, Future}
import models.{Loan, LoanTable}

@Singleton
class LoanController @Inject()(db: Database, cc: ControllerComponents)(implicit ec: ExecutionContext) 
  extends AbstractController(cc) with LoanTable {

  // Método para obtener todos los préstamos
  def index() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      db.withSession { implicit session =>
        loans.result // Ejecutar la consulta para obtener todos los préstamos
      }
    }.map { loanList =>
      Ok(views.html.index(loanList)) // Renderiza la vista con la lista de préstamos
    }
  }

  // Método para agregar un préstamo
  def addLoan() = Action { implicit request: Request[AnyContent] =>
    val loan = Loan(0, 10000, 5.5, 12) // Ejemplo, normalmente obtendrás estos datos del request
    db.withSession { implicit session =>
      loans += loan // Inserta el préstamo en la base de datos
    }
    Redirect(routes.LoanController.index()) // Redirige a la lista de préstamos
  }
}
