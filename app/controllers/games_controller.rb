class GamesController < ApplicationController
  before_action :set_game, only: %i[ show edit update destroy ]

  # GET /games
  def index

    @games = Game.all
    # You want to send back: User
    # Send back wallet information
    # Send back the $$$ won or lost
    # Send the user winstreak to the game / result model too
    render json: @games
  end

  # GET /games/1
  def show

  end

  # POST /games or /games.json
  def create
    # Before creating, ensure you have a valid web3 login.
    # IF THERE IS A GAP between the ID it is creating, and the ID that is last, you should fix.
    # Setup wristbanding for "connect wallet" assuming your auth as user #1 for now.
    user= User.find_by_id(params[:user_id])
    user[:balance] -= params[:wagerAmount]
    user.save
    @game = Game.create(game_params)
    render json: @game, status: 200
  end

  # PATCH /games/1
  def update
    user= User.find_by_id(params[:user_id])
    game= Game.find_by_id(params[:id])
    
    # set flip result and userwin
    if params[:result] === 'Tails'
      game[:flipResult] = true
    elsif params[:result] === 'Heads'
      game[:flipResult] = false
    end
    game[:userWin] = params[:outcome]

    # Set game $$$ distrib, and update user balance and winstreak
    if params[:outcome]
      game[:wagerResult] = params[:wagerAmount]*2
      # Only pay user if they win
      user[:balance] += game[:wagerResult]
    elsif !params[:outcome]
      game[:wagerResult] = -params[:wagerAmount]
    end
  # Set winstreak
  if params[:outcome]
      user[:winStreak] += 1
  else user[:winStreak] = 0
  end

  user.save
  game.save

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

# UNUSED:
################
  
  #   # GET /games/new
  #   def new
  #     @game = Game.new
  #   end

  #   # GET /games/1/edit
  #   def edit
  #   end

end
