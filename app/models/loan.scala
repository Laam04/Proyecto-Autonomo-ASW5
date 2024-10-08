package models

import slick.jdbc.JdbcProfile

case class Loan(id: Long, amount: Double, interestRate: Double, term: Int)

trait LoanTable {
  this: JdbcProfile =>
  
  import profile.api._

  class Loans(tag: Tag) extends Table[Loan](tag, "loans") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def amount = column[Double]("amount")
    def interestRate = column[Double]("interest_rate")
    def term = column[Int]("term")

    def * = (id, amount, interestRate, term) <> (Loan.tupled, Loan.unapply)
  }

  val loans = TableQuery[Loans]
}
