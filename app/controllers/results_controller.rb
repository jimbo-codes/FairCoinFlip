class ResultsController < ApplicationController

    def create
                # This should validate that it is not overwriting existing result
                #should also validate it's the NEXT # after last game. (equals)
        
        # Set wager
        if params[:outcome] 
            wagerResult = params[:wagerAmount]*2
        elsif !params[:outcome]
            wagerResult = -params[:wagerAmount]
        end
        # set flip result
        if params[:result] === 'Tails'
            flipResult = true
        elsif params[:result] === 'Heads'
            flipResult = false
        end
        win = params[:outcome]

        user = User.find_by_id(params[:user_id])
        # Set this win streak in the game/result model too
        if win
            user[:winStreak] += 1
        else user[:winStreak] = 0
        end
        user.save

        # Update GAME here too with the result.
        game = user.games.last
        game[:gameResult] = params[:outcome]
        game.save

        # This should be done w/ mass assignment? just set it to correct var names.
        @result = Result.create(wagerResult: wagerResult, flipResult: flipResult, win: win, game_id: params[:id])
        render json: @result, status: 201
    end

    private
    def result_params
        # params.require(:result).permit(:wagerResult, :flipResult, :win, :game_id)
    end

end
