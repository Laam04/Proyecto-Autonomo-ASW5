package models

import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

case class Loan(id: Long, amount: Double, interestRate: Double, duration: Int)

trait LoanTable {
  protected val profile: JdbcProfile
  import profile.api._

  class Loans(tag: Tag) extends Table[Loan](tag, "loans") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def amount = column[Double]("amount")
    def interestRate = column[Double]("interest_rate")
    def duration = column[Int]("duration")

    def * = (id, amount, interestRate, duration) <> ((Loan.tupled), Loan.unapply)
  }

  protected val loans = TableQuery[Loans]
}

