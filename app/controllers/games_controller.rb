class GamesController < ApplicationController
  before_action :set_game, only: %i[ show edit update destroy ]

  # GET /games
  def index
    @games = Game.all
    render json: @games
  end

  # GET /games/1
  def show

  end

  # POST /games or /games.json
  def create
    # Before creating, ensure you have a valid web3 login.

    # IF THERE IS A GAP between the ID it is creating, and the ID that is last, you should fix.
    
    # Find your user and get userid first
    # Setup wristbanding for "connect wallet" assuming your auth as user #1 for now.
    @game = Game.create(game_params)
    render json: @game
  end

  # PATCH/PUT /games/1 or /games/1.json
  # You shouldn't need this ?
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to game_url(@game), notice: "Game was successfully updated." }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
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
