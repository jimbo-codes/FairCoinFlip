class FunGamesController < ApplicationController

    # This should only have index, create, and update.

    # GET /funGames
    def index
        debugger
        
    end

    # POST /funGames
    def create
        # Create the fun game in same format, update the relevant user fun items.
    user= User.find_by_id(params[:user_id])
    if(user[:funBal]>=params[:wagerAmount])
    user[:funBal] -= params[:wagerAmount]
    user.save
    @funGame = FunGame.create(funGame_params)
    else
      render json: {error: "Insufficient Balance."}
    end
    render json: @funGame, status: 200
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
        funGame[:funUserWin] = params[:outcome]
    
        # Set funGame $$$ distrib, and update user balance and winstreak

        if params[:outcome]
          funGame[:wagerResult] = params[:wagerAmount]*2
          # Only pay user if they win
          user[:funBal] += funGame[:wagerResult]
        elsif !params[:outcome]
          funGame[:wagerResult] = -params[:wagerAmount]
        end
      # Set winstreak
      if params[:outcome]
          user[:funStreak] += 1
      else user[:funStreak] = 0
      end
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
