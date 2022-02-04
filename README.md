# README

This application has NOT HAD ITS BACKEND TOUCHED.
-- not even db:create.
-- we have to decide how we want to deal with this database before making any decisions.

It is intended to setup a Postgresql database (confirm) to track user stats and historical wins, losses, etc.

For now, the only focus is on building out frontend MVP functionality (with a mobile first build in)


Known issues:
Going back and forward causes failed requests + UI bugs.


NEXT STEPS:
---- Update the user once each game happens to debit or credit acct appropriately (and update stats where apt)
 --- create methods for summary statistics for the games that have been played
     ---- and for individuals
8. Account, leaderboard
9. steps for deployment on real website?


POST BACKEND MVP:
1. SETUP FUNDS TRACKER (do this in your database (?) will replace w/ wallet eventually)
5. Top Navbar links (leaderboard and backend stuff, but also INDIVIDUAL PLAYER INFO)
1. Get an empty coin graphic (a missing coin) to display when you lose.
5. Small links at bottom (faq, etc)
6. Popup to gamble responsibly (and in right location)
7. ADD BREAKPOINTS FOR non-mobile users, screen size optimization
8. Your desktop should have more User info (more real estate)
9. Tracking stats to know if they are desktop or mobile

QUESTIONS:
*** Security risk for CSRF token (rails additional security beyond CORS)
   cookies["CSRF-TOKEN"] -- did you introduce a security vulnerability here? can it be fixed w/ web3js
1. Chose to create your game, then delete it if they go back? from confirm screen - alternatively this could be handled on frontend. - is either of these diff
2. For the play again button (should it natively have the bet features again on the page? -- depends on how to "claim" works.)
3. Track the bet in state too (both the bet and selection should be sent to backend on initial flip)
4. Security issues, what do we need to move to backend server?
5. Coin animation --- can you somehow make it Grow like the one on that one website?