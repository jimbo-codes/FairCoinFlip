class GamesController < ApplicationController
  before_action :set_game, only: %i[ show edit destroy ]

  # GET /games
  def index
    # Get all the games you're gonna include (pick # to show in table)
    @games = Game.last(10)
    @games = @games.reverse
    
    render json: @games, include: [:user]
  end

  # GET /games/1
  def show
    # Would you need this ever?
  end

  # POST /games or /games.json
  def create
    # Before creating, ensure you have a valid web3 login.
    # IF THERE IS A GAP between the ID it is creating, and the ID that is last, you should fix.
    # Setup wristbanding for "connect wallet" assuming your auth as user #1 for now.
    user= User.find_by_id(params[:user_id])
    # This "wager amount" should also include the gas fee
    if(user[:balance]>=params[:wagerAmount])
    user[:balance] -= params[:wagerAmount]
    user.save
    @game = Game.create(game_params)
    else
      render json: {error: "Insufficient Balance."}
    end
    # Create game results too.
    if params[:result][0]
      @game[:flipResult] = params[:call]
      @game[:wagerResult] = params[:wagerAmount]*2
      user[:balance] += @game[:wagerResult] # is this necessary?
      user[:winStreak] += 1
    else
      @game[:flipResult] = !params[:call]
      @game[:wagerResult] = -params[:wagerAmount]
      user[:winStreak] = 0
    end
    @game[:userWin] = params[:result][0]
    @game[:userStreak] = user[:winStreak];
# debugger
  user.save
  @game.save

    render json: @game, status: 200
  end




  # PATCH /games/1
  def update
    # Not using this, handling all in create action
    user= User.find_by_id(params[:user_id])
    game= Game.find_by_id(params[:id])
    # set flip result and userwin
  render json: game, status: 200
  end

  # DELETE /games/1
  def destroy
    @game.destroy
    render json: {}, status: 204
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end
    # Filter your parameters here (params.require().permit?)
    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:wagerAmount, :call, :user_id)
    end

end
