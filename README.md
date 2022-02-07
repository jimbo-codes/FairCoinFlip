# README

Known issues:
Going back and forward causes failed requests + UI bugs.
Ensure the user has the funds to bet, subtract their funds once they made the bet. <--- as a part of the game creation process
 setup params require for all
 Setup error handling for all
 Do not let the game play if the responses from fetch are not approved
 Fix the breakpoints of small screen for the recent plays -- the no-wrap is causing issues. this works how you want it if you
 just ignore the inner <span> element, then it will wrap both lines together.


NEXT STEPS:
*** Fix the profile picture SVG ***
Put together LIST of the stats you want to track
 --- create methods for summary statistics for the games that have been played
8. Account, leaderboard
9. Replace user_id with sessions (probably after web3js implementation)
9. steps for deployment on real website?


POST BACKEND MVP:
5. Top Navbar links (leaderboard and backend stuff)
1. Get an empty coin graphic (a missing coin) to display when you lose.
5. Small links at bottom (faq, etc)
6. Popup to gamble responsibly (and in right location)
7. ADD BREAKPOINTS FOR non-mobile users, screen size optimization
8. Your desktop should have more User info (more real estate)
9. Tracking stats to know if they are desktop or mobile
2. Dollar conversion for ETH - pull from other proj (update on every game update)

QUESTIONS:
*** Security risk for CSRF token (rails additional security beyond CORS)
   cookies["CSRF-TOKEN"] -- did you introduce a security vulnerability here? can it be fixed w/ web3js
1. Chose to create your game, then delete it if they go back? from confirm screen - alternatively this could be handled on frontend. - is either of these diff
2. For the play again button (should it natively have the bet features again on the page? -- depends on how to "claim" works.)
3. Track the bet in state too (both the bet and selection should be sent to backend on initial flip)
4. Security issues, what do we need to move to backend server?
5. Coin animation --- can you somehow make it Grow like the one on that one website?