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
            @result = Result.create(wagerResult: wagerResult, flipResult: flipResult, win: win, game_id: params[:id])
        render json: @result, status: 201
    end

    private
    def result_params
        # params.require(:result).permit(:wagerResult, :flipResult, :win, :game_id)
    end

end
