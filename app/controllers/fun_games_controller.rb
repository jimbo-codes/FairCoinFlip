class FunGamesController < ApplicationController

    # This should only have index, create, and update.

    # GET /funGames
    def index
      funGames = FunGame.last(10)
      funGames = funGames.reverse
      
      render json: funGames, include: [:user]
    end

    # POST /funGames
    def create
      # Create the fun game in same format, update the relevant user fun items.
    user= User.find_by_id(params[:user_id])
    if(user[:funBal]>=params[:wagerAmount])
    user[:funBal] -= params[:wagerAmount]
    user.save
    funGame = FunGame.create(funGame_params)

    # Random number generator to replace "local outcome"
    # Params call = user's bet.
    gameResult = rand()
    if gameResult > 0.5
      funGame[:flipResult] = true; #This means its tails
    else
      funGame[:flipResult] = false; #This means its tails
    end
  
    # Set the outcome, flip result, wager result, user funstreak, user funbal
    if funGame[:flipResult] === funGame[:call]
      funGame[:funUserWin] = true
      funGame[:wagerResult] = params[:wagerAmount]*2
      user[:funBal] += funGame[:wagerResult]
      user[:funStreak] += 1
    else
      funGame[:wagerResult] = -params[:wagerAmount]
      funGame[:funUserWin] = false
      user[:funStreak] = 0
    end
  funGame[:funUserStreak] = user[:funStreak];    

  user.save
  funGame.save
    else
      render json: {error: "Insufficient Balance."}
    end
    render json: funGame, status: 200
    end

    # PATCH /funGames/:id (wallet?)
    def update
        user= User.find_by_id(params[:user_id])
        funGame= FunGame.find_by_id(params[:id])        
        # set flip result and userwin
        if params[:result] === 'Tails'
          funGame[:flipResult] = true
        elsif params[:result] === 'Heads'
          funGame[:flipResult] = false
        end
        funGame[:funUserWin] = params[:funUserWin]
            
      funGame[:funUserStreak] = user[:funStreak];    
    
      user.save
      funGame.save
    
      render json: funGame, status: 200
    end

    private
    def funGame_params
        params.require(:fun_game).permit(:wagerAmount, :call, :user_id)
      end
end
