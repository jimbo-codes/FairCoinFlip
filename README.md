# README

Plan of Attack:
1. How does deploying on polygon work (EVM compatible, etc?)
   -- you're going to have to be betting with Polygon
2. How can we roll this out for different communities
   --- A multi tenant architecture - We'd prefer not to give them the source code to implement on their website
   --- In this scenario, we handle it, our smart contract apportions sending a certain amount to them vs. to us. --- AWS Multi tenant approach - https://www.clickittech.com/saas/multi-tenant-architecture/
         ---- OTHER OPTION IS TO Have them host it on their website (how can you guarantee that they don't change the house wallet ETC if this is the case?) -- This requires a ***Strong legal contract, and legit KYC (we gotta know who they are) ***
      - Do we need/want a non-aws way of doing this?
      - Include in their specific Data what their house wallet address is
3. Deployment
   3a. Domain name?
   3b. Where does this get hosted? (aws?)


Feature List:
- Usehistory (/ usenavigate) to prevent user back button (send dashboard)
- NFTs
- NFT Staking (Down the line)

Known issues:
Troubleshoot creating a new user (this could be a no-wifi issue, not clear.)
Going back and forward causes failed requests + UI bugs.
 setup params require for all
 Setup error handling for all
 Do not let the game play if the responses from fetch are not approved
 *** If you swap to a different account you stay logged in on original. Is this somehow a security risk?*** -- swapping accts should def sign you out though.
   - maybe should set it so user has to login every time at first
Ensure the user has the funds to bet, subtract their funds once they made the bet. <--- as a part of the game creation process calling smart contract.

NEXT STEPS:
Build out local competition leaderboard (fake money, testmode)
^^ STAT TRACKING FOR LOCAL -- who has the most fake $$
Deploy your testnet contract for if they win or lose coin flip
   Have a setup wallet dedicated to paying out wins / losses
Display logged in wallet on the screen (where on mobile?)
Put together LIST of the stats you want to track -- user LONGEST winstreak
 --- create methods for summary statistics for the games that have been played
   10. Put a "total paid out" field (in stats first, then on homepage)
5. Functionality for top Navbar links (leaderboard and backend stuff)
8. Statistics (consolidated), leaderboard
9. Replace user_id with sessions (probably after web3js implementation)
*** Depending on your selection of heads vs. Tails, set the coin image to heads (or tails) ***
Add onclick rotate (just one flip) for the coin
5. Small links at bottom (faq, etc)
----- Add social links to the bottom (once authenticated)
9. steps for deployment on real website?
2. Dollar conversion for ETH - pull from other proj (update on every game update)
8. Your desktop should have more User info (more real estate) - show win streak, balance, maybe some other stuff on top right (w/ profile image)
6. Popup to gamble responsibly (and in right location)
9. Tracking stats to know if they are desktop or mobile


QUESTIONS:
2. For the play again button (should it natively have the bet features again on the page? -- depends on how to "claim" works.)
4. Security issues, what do we need to move to backend server?
5. Coin animation --- can you somehow make it Grow like the one on that one website?