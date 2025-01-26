class User {
  constructor(userId, displayName, email, password, leagues, portfolios) {
    this.userId = userId;
    this.displayName = displayName;
    this.email = email;
    this.leagues = leagues; // leagues will be a [[leagueId, portfolioId]] where portfolioId is the portfolio under the user that is being associated with the league
    this.portfolios = portfolios;
    this.password = password;
  }
}
